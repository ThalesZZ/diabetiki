'use client'

import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    notification,
    type ModalProps,
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useRouter } from 'next/navigation'
import React from 'react'

type FormType = {
  id?: string
  timestamp: Dayjs
  value: number
  comment: string
}

export type GlucoseEventModalProps = {
  event?: FormType
  open: boolean
  onSubmit: <T>(event: FormType) => Promise<T | void>
  onClose: VoidFunction
}

export default function GlucoseEventModal({
  event,
  open,
  onSubmit,
  onClose,
}: GlucoseEventModalProps) {
  const router = useRouter()
  const editMode = !!event

  const [form] = Form.useForm<FormType>()
  const [isSubmitting, doSubmit] = React.useTransition()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = React.useMemo(() => dayjs(), [open])

  const initialValues = React.useMemo<Partial<FormType>>(() => {
    if (editMode) return { ...event, timestamp: dayjs(event?.timestamp) }
    return { timestamp: now, value: 100 }
  }, [event, editMode, now])

  const submit: ModalProps['onOk'] = async () => {
    doSubmit(async () => {
      form.submit()
      return await form
        .validateFields()
        .then(async (values) => {
          return onSubmit(values)
            .then(() => {
              router.refresh()
              onClose()
              notification.success({
                placement: 'top',
                message: 'Record successfuly saved',
              })
            })
            .catch(() => {
              notification.error({
                placement: 'top',
                message: 'Error trying to save record',
              })
            })
        })
        .catch(() => {
          notification.error({
            placement: 'top',
            message: 'Field(s) contains error',
          })
        })
    })
  }

  const cancel: ModalProps['onCancel'] = async () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={editMode ? 'Editing event' : 'New event'}
      open={open}
      okText={'Save'}
      confirmLoading={isSubmitting}
      onOk={submit}
      onCancel={cancel}
      cancelButtonProps={{ disabled: isSubmitting }}
      maskClosable={false}
    >
      <Form
        form={form}
        initialValues={initialValues}
        labelAlign="left"
        labelCol={{ span: 6 }}
        labelWrap
      >
        <Form.Item<FormType> name="id" hidden />
        <Form.Item<FormType>
          label={'Date and time'}
          name="timestamp"
          rules={[{ required: true, message: 'Required' }]}
        >
          <DatePicker
            maxDate={now}
            showTime={{ showSecond: false }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item<FormType>
          label={'Blood glucose'}
          name="value"
          rules={[{ required: true, message: 'Required' }]}
        >
          <InputNumber min={0} suffix={'mg/dL'} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<FormType> label={'Comment'} name="comment">
          <Input.TextArea maxLength={100} autoSize showCount />
        </Form.Item>
      </Form>
    </Modal>
  )
}
