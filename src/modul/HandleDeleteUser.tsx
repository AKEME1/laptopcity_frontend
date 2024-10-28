// DeleteUserModal.tsx
import React from 'react';
import { Modal, Button } from 'antd';

interface DeleteUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  userName: string; // To show which user is being deleted
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ visible, onCancel, onDelete, userName }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete"  onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete the user <strong>{userName}</strong>? This action cannot be undone.</p>
    </Modal>
  );
};

export default DeleteUserModal;
