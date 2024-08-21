'use client'

import { PlusOutlined as NewIcon } from '@ant-design/icons'
import {
  DatePicker,
  FloatButton,
  FloatButtonProps,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  notification,
} from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import React from 'react'

type FormType = {
  timestamp: Dayjs
  glucose: number
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
          return await fetch('http://localhost:3030/glucose', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
              'Content-Type': 'application/json',
            },
          })
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
  const maxDate = React.useMemo(() => dayjs(), [openModal])

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
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker
              maxDate={maxDate}
              showTime={{ showSecond: false }}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item<FormType>
            label={'Blood glucose'}
            name="glucose"
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
