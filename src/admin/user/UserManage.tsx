import { useState } from "react";
import { UserAdminType } from "../../productTypes/productType";
import { useQuery } from "react-query";
import { fetchUsers } from "../../requestResponsehandler/user";
import Skeleton from "react-loading-skeleton";
import { Table, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditUserModal from "../../modul/HandleEditUser";
import { updateUser } from "../../requestResponsehandler/user";
import DeleteUserModal from "../../modul/HandleDeleteUser";
import { deleteUser } from "../../requestResponsehandler/user";

const UserManage = () => {
const [toggle,setToggle]=useState<boolean>(false)
const [toggleDelete,setToggleDelete]=useState<boolean>(false)
const [userName,setUserName]=useState<string>('')
 const [currentUser, setCurrentUser] = useState<UserAdminType | null>(null); 
 
  // Handlers for Edit and Delete actions
  const handleEdit = (record: UserAdminType) => {
    console.log('Edit user:', record);
    setCurrentUser(record)
    setToggle(true)
    // Add your edit logic here
  };

const handleUpdateUser = async (field: string, value: string) => {
  
    if (currentUser) {
      const updatedUser = { ...currentUser, [field]: value }; // Create a new user object with the updated field
      await updateUser(updatedUser, currentUser._id); // Call your updateUser function
      setToggle(false); // Close the modal after updating
      // Optionally, you can trigger a refetch of users here or update the local state
    }

    console.log("we are here")
  };

  
  const handleDelete = (record: UserAdminType) => {
    console.log('Delete user:', record);
    setUserName(record.name)
    setCurrentUser(record)
    setToggleDelete(true)
  };

  const handleDeleteUser = async () => {
  
    if (currentUser) {
       // Create a new user object with the updated field
      await deleteUser(currentUser._id) // Call your updateUser function
      setToggleDelete(false); // Close the modal after updating
      // Optionally, you can trigger a refetch of users here or update the local state
    }


  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string | undefined) => {
        if (!role) {
          return <Tag color="gray">Unknown</Tag>;
        }
        let color = role === 'admin' ? '#f472b6' : '#ADD8E6';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => {
        return active ? <Tag color="#32CD32">Active</Tag> : <Tag color="red">Inactive</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: UserAdminType) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} style={{ color: 'blue' }} />
          <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
        </Space>
      ),
    },
  ];

  
  const { data, isLoading, isError } = useQuery<UserAdminType[]>('ProductCount', fetchUsers);

  if (isLoading) return <div><Skeleton count={10} /></div>;

  return (
    <div className={`${toggle?'blur-sm':""}`}>
    <Table 
    columns={columns} 
    dataSource={data} 
    rowKey="_id" 
    style={{ fontFamily: "'Roboto', sans-serif" }}  
    />
  {
  toggle&&<EditUserModal    onSubmit={handleUpdateUser} onCancel={()=>setToggle(false)} visible={toggle}/>
}
{
    toggleDelete&&<DeleteUserModal userName={userName}  onDelete={handleDeleteUser} onCancel={()=>setToggleDelete(false)} visible={toggleDelete}/>
}
    </div>
  );
}

export default UserManage;
