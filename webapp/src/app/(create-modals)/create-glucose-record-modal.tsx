'use client'

import { createGlucoseEvent } from '@/lib/api/glucose'
import { PlusOutlined as NewIcon } from '@ant-design/icons'
import {
  DatePicker,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  type FloatButtonProps,
  type ModalProps,
} from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import React from 'react'

type FormType = {
  timestamp: Dayjs
  value: number
  comment: string
}

const CreateGlucoseRecordModal: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false)

  const [form] = Form.useForm<FormType>()
  const [isSubmitting, setSubmitting] = React.useTransition()

  const onOpen: FloatButtonProps['onClick'] = () => {
    setOpenModal(() => true)
    form.resetFields()
  }

  const onCancel: ModalProps['onCancel'] = () => {
    setOpenModal(() => false)
  }

  const onSubmit: ModalProps['onOk'] = async () => {
    setSubmitting(async () => {
      form.submit()
      return await form
        .validateFields()
        .then(async (event) => {
          return createGlucoseEvent(event)
            .then((r) => {
              setOpenModal(() => false)
              notification.success({
                placement: 'top',
                message: 'Record successfuly saved',
              })
            })
            .catch((reason) => {
              notification.error({
                placement: 'top',
                message: 'Error trying to save record',
              })
            })
        })
        .catch((reason) => {
          notification.error({
            placement: 'top',
            message: 'Field(s) contains error',
          })
        })
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = React.useMemo(() => dayjs(), [openModal])

  return (
    <>
      <FloatButton
        type="primary"
        icon={<NewIcon />}
        tooltip={'New record'}
        onClick={onOpen}
      />

      <Modal
        title={'New record'}
        open={openModal}
        okText={'Submit'}
        confirmLoading={isSubmitting}
        onOk={onSubmit}
        onCancel={onCancel}
        cancelButtonProps={{ disabled: isSubmitting }}
        maskClosable={false}
      >
        <Form
          name="glucose-record"
          form={form}
          labelAlign="left"
          labelWrap
          labelCol={{ span: 6 }}
        >
          <Form.Item<FormType>
            label={'Date and time'}
            name="timestamp"
            initialValue={now}
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
            initialValue={100}
            rules={[{ required: true, message: 'Required' }]}
          >
            <InputNumber min={0} suffix={'mg/dL'} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<FormType> label={'Comment'} name="comment">
            <Input.TextArea maxLength={100} autoSize showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateGlucoseRecordModal
