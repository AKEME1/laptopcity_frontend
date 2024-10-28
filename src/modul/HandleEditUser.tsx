import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface EditUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (field: string, value: string) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [selectedField, setSelectedField] = React.useState<string>('name');
  const [inputFiled,setInputFiled] = React.useState<string>('');
  console.log(inputFiled)
console.log(selectedField)
  // Handle form submission
  const handleFinish = (values: { field: string; value: string }) => {
    onSubmit(values.field, values.value);
  };

  return (
    <Modal
      title="Edit User Field"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={handleFinish} layout="vertical">
        {/* Field Selection */}
        <Form.Item label="Field to Edit" name="field" initialValue={selectedField} rules={[{ required: true }]}>
          <Select onChange={(value) => setSelectedField(value)}>
            <Option value="name">Name</Option>
            <Option value="email">Email</Option>
            <Option value="role">Role</Option>
            <Option value="active">Status</Option>
          </Select>
        </Form.Item>

        {/* Input for New Value */}
        <Form.Item label="New Value" name="value" rules={[{ required: true, message: 'Please enter the new value' }]}>
          <Input onChange={(e)=>setInputFiled(e.target.value)} placeholder={`Enter new ${selectedField}`} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
