import { Button, Modal } from "antd";
import { Form, Input, Select } from "antd";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import axios from "axios";
// import "antd/dist/antd.css";
import EditIcon from "@mui/icons-material/Edit";

import TextField from "@mui/material/TextField";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // console.log(e);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  // const onGenderChange = (value) => {
  //   switch (value) {
  //     case "male":
  //       form.setFieldsValue({
  //         note: "Hi, man!",
  //       });
  //       return;

  //     case "female":
  //       form.setFieldsValue({
  //         note: "Hi, lady!",
  //       });
  //       return;

  //     case "other":
  //       form.setFieldsValue({
  //         note: "Hi there!",
  //       });
  //   }
  // };

  const onFinish = async (values) => {
    console.log(values);
    await axios
      .post("http://localhost:7001", values)
      .then((res) => {
        alert("Record Saved");
        console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      Quantity: "Add Quantity",
      Catagory: "Add catagory",
    });
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          color: "white",
          backgroundColor: "black",
        }}
        onClick={showModal}
      >
        Add Inventry
      </Button>

      <Modal
        title="Add Items"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="qty"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="catagory"
            label="Catagory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "black",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* 
        <TextField id="standard-basic" label="Quantity" variant="standard" />

        <TextField id="standard-basic" label="Catatgory" variant="standard" />

        <TextField id="standard-basic" label="Price" variant="standard" /> */}
      </Modal>
    </>
  );
};

export default AddModal;
