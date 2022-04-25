import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import SideBar from "../SideBar.js";
import NavBar from "../NavBar.js";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddBlog = () => {
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sidebar-toggle");
      });
    }
  });

  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`http://localhost:2020/api/post/${id}`);
      setTitle(data.title);
      setName(data.name);
      setDescription(data.userInfo.description.value);
    };

    getDataById();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    // update by put request

    const data = {
      title: title,
      name: name,
      description: userInfo.description.value,
    };

    await axios.put(`http://localhost:2020/api/post/${id}`, data);

    history.push("/Posts");
  };

  const [userInfo, setuserInfo] = useState({
    title: "",
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  return (
    <div className="d-flex bungkus">
      <SideBar />
      <div className="konten-bungkus">
        <NavBar />
        {/* Page Konten */}
        <div className="container pb-4">
          <Card className="shadow">
            <div className="card-header">
              <h4
                style={{
                  float: "left",
                }}
              >
                Edit Blog
              </h4>
            </div>

            <Form
              style={{
                padding: "10px",
              }}
              onSubmit={updateHandler}
            >
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Nama
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Nama mu..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Judul Blog
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Judul Blog..."
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>
              {/* <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Kategori
                </Form.Label>
                <Col sm="10">
                  <Form.Select name="category" required>
                    <option disabled>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group> */}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Isi Konten
                </Form.Label>
                <Col sm="10">
                  {/* <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    name="nama"
                    placeholder="Isi konten..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  /> */}
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <textarea
                    style={{ display: "none" }}
                    disabled
                    ref={(val) => (userInfo.description = val)}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  />
                </Col>
              </Form.Group>
              <Col>
                <Button
                  variant="outline-dark"
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    float: "right",
                  }}
                  type="submit"
                >
                  <strong>
                    SIMPAN <i class="fa fa-save"></i>
                  </strong>
                </Button>
              </Col>
              <Col>
                <Button
                  href="/Posts"
                  variant="outline-dark"
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    marginRight: "10px",
                    float: "right",
                  }}
                >
                  <strong>
                    <i class="fas fa-caret-left"></i> BACK
                  </strong>
                </Button>
              </Col>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
