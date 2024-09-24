import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import { Tooltip, IconButton } from "@mui/material";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  FormText,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
} from "reactstrap";
import "../../styles/admin/dashBoard.scss";
import {
  RegisterUser,
  deleteCompany,
  deleteJob,
  deleteUser,
  getAllCompanies,
  getAllJobs,
  getAllUsers,
  postCompany,
  postData,
} from "../../redux/slices/dataSlice";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
export default function DashBoard() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [open123, setOpen123] = useState({
    open1: true,
    open2: false,
    open3: false,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});
  const [compNames, setCompNames] = useState([]);
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const allUsers = useSelector((state) => state.User.value.allUsers);
  const jobData = useSelector((state) => state.User.value.jobData);
  const companyData = useSelector((state) => state.User.value.companyData);

  const toggle = () => {
    setModal(!modal);
    setModal1(false);
    setModal2(false);
  };
  const toggle1 = () => {
    setModal1(!modal1);
    setModal(false);
    setModal2(false);
  };
  const toggle2 = () => {
    setModal2(!modal2);
    setModal1(false);
    setModal(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
    window.alert("success");
    setModal(false);
    window.location.reload();
  };
  const onHandleClick2 = () => {
    // dispatch(getAllUsers());
    setOpen123({ ...open123, open1: true, open2: false, open3: false });
  };
  const onHandleClick3 = (e) => {
    e.preventDefault();
    dispatch(postData(formData1));
    window.alert("success");
    setModal1(false);
    window.location.reload();
  };
  const onHandleClick4 = () => {
    // dispatch(getAllJobs());
    setOpen123({ ...open123, open1: false, open2: true, open3: false });
  };
  const onHandleClick9 = () => {
    // dispatch(getAllCompanies());
    setOpen123({ ...open123, open1: false, open2: false, open3: true });
  };
  const handleClick5 = () => {
    setOpen(!open);
  };
  const handleClick6 = (e) => {
    e.preventDefault();
    dispatch(postCompany(formData2));
    window.alert("success");
    setModal2(false);
  };
  const handleClick8 = (args) => {
    const { jobId, cid } = args;
    dispatch(deleteJob({ jobId: jobId, cid: cid }));
    window.location.reload();
    // setOpen123({ ...open123, open1: false, open2: true, open3: false })
  };
  const handleClick7 = (id) => {
    dispatch(deleteUser({ userId: id }));
    window.location.reload();
  };
  const handleClick10 = (id) => {
    dispatch(deleteCompany({ cid: id }));
    window.location.reload();
  };
  const token = localStorage.getItem("token");
  const access = localStorage.getItem("access");
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCompanies());
    dispatch(getAllJobs());
    if (!token && !access) {
      navigate("/admin/login");
    }
  }, [token, access]);
  console.log(compNames);
  console.log(formData1);
  useEffect(() => {
    setCompNames(companyData.map((e) => e.company_name + "$" + e._id));
  }, [companyData]);
  return (
    <div className="dashboard-container" style={{ backgroundColor: 'rgb(243,243,243)', height: '100%' }}>
      <Header />
      <div className="dashboard-display-part pt-3 bg-light">
        <div className="listings shadow border bg-light rounded pill " style={{ height: '65vh' }}>
          <ol
            style={{ listStyle: "none", lineHeight: "3rem", cursor: "pointer" }}
          >
            <li onClick={onHandleClick2}>Users</li>
            <li onClick={toggle}>Add User</li>
            <li onClick={onHandleClick4}>Jobs</li>
            <li onClick={toggle1}>Add Job</li>
            <li onClick={onHandleClick9}>Company</li>
            <li onClick={toggle2}>Add Company</li>

            <li
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              LogOut
            </li>
          </ol>
        </div>

        {/* display jobs and users and company */}

        <div
          className={open123.open1 ? "display-part" : "display-part-disable"}
        >
          {allUsers &&
            allUsers.map((e) => {
              return (
                <div className="">
                  <Card
                    style={{
                      width: "18rem",
                    }}
                  >
                    <div className="delete">
                      {" "}
                      <Tooltip title="Delete User">
                          <button onClick={() => handleClick7(e._id)} type="button">
                            X
                          </button>
                      </Tooltip>
                    </div>
                    <CardBody>
                      <CardTitle tag="h5">{e.username}</CardTitle>
                      <CardText>
                        <div>
                          <Label className="h6">Email:</Label>
                          {e.email}
                        </div>
                        <div>
                          <Label className="h6">Access : </Label>
                          {e.access}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>

        <div
          className={open123.open2 ? "display-part" : "display-part-disable"} style={{ rowGap: '1em' }}
        >
          {jobData &&
            jobData.map((e) => {
              return (
                <div className="">
                  <Card>
                    <div className="delete">
                      {" "}
                      <Tooltip title="Delete Job">
                          <button onClick={() => handleClick8({ jobId: e._id, cid: e.cid })} type="button">
                            X
                          </button>
                      </Tooltip>
                    </div>
                    <CardBody>
                      <CardTitle tag="h5">{e.title}</CardTitle>
                      <CardText>
                        <div>
                          <Label className="h6" style={{ fontWeight: "500" }}>
                            Company Name :
                          </Label>
                          {e.company_name.split("$")[0]}
                        </div>
                        <div>
                          <Label className="h6">Role</Label>
                          {e.role}
                        </div>
                        <div>
                          <Label className="h6">State :</Label>
                          {e.States}
                        </div>
                        <div>
                          <Label className="h6">Employment Type :</Label>
                          {e.employmenttype}
                        </div>
                        <div>
                          <Label className="h6">Functional Area :</Label>
                          {e.functionalarea}
                        </div>
                        <div>
                          <Label className="h6">Experience : </Label>
                          {e.experience}
                        </div>
                        <div>
                          <Label className="h6">Skills :</Label>
                          {e.skills}
                        </div>
                        <div>
                          <Label className="h6">Openings :</Label>
                          {e.openings}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
        <div
          className={open123.open3 ? "display-part" : "display-part-disable"} style={{ marginLeft: '3em', rowGap: '1em' }}
        >
          {companyData &&
            companyData.map((e) => {
              return (
                <div>
                  <Card>
                    <div className="delete">
                      {" "}
                      <Tooltip title="Delete Company">
                      <button onClick={() => handleClick10(e._id)} type="button">
                        X
                      </button>
                      </Tooltip>
                    </div>
                    <CardBody>
                      <CardText>
                        <div>
                          <Label className="h6">Company Name :</Label>
                          {e.company_name}
                        </div>

                        <div>
                          <Label className="h6">Job Postings :</Label>
                          <span>{e.jobs ? e.jobs.length : "0"}</span>
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add User */}
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={handleClick} sm={12}>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Email :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Username :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="username"
                    placeholder="Username"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={3}>
                  Password :
                </Label>
                <Col sm={9}>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={3}>
                  Access :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(e) =>
                      setFormData({ ...formData, access: e.target.value })
                    }
                  >
                    <option>select</option>
                    <option value="editor">Editor</option>
                    <option value="associate">Associate</option>
                    <option value="recruitor">Recruitor</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button className="bg-success" style={{ marginLeft: '7em' }}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      {/* Add  jobs */}
      <div style={{ width: "100%" }}>
        <Modal isOpen={modal1} toggle={toggle1}>
          <ModalHeader toggle={toggle1}>Add Job</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={onHandleClick3}>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Title :
                </Label>
                <Col sm={8} style={{ marginLeft: '2.5em' }}>
                  <Input
                    id="exampleEmail"
                    name="title"
                    placeholder="Title"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, title: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleSelect" sm={4}>
                  Company Name :
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(q) => setFormData1({ ...formData1, cid: q.target.value.split("$")[1], company_name: q.target.value.split("$")[0] })}
                  >
                    <option >select</option>
                    {compNames &&
                      compNames.map((i) => {
                        return (
                          <option value={i}>
                            {i.split("$")[0]}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Role :
                </Label>
                <Col sm={8} style={{ marginLeft: '2.5em' }}>
                  <Input
                    id="exampleEmail"
                    name="role"
                    placeholder="Role"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, role: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Functional Area :
                </Label>
                <Col sm={8} >
                  <Input
                    id="exampleEmail"
                    name="functionalarea"
                    placeholder="Functional Area"
                    type="text"
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        functionalarea: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  States/Cities:
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name="States/Cities: "
                    placeholder="States/Cities: "
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, States: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Employment Type:
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name="Employment Type: "
                    placeholder="Employment Type "
                    type="text"
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        employmenttype: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Skills :
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name="skills"
                    placeholder="Skills"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, skills: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Experience :
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name=" Experience"
                    placeholder=" Experience"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, experience: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Openings :
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name="openings"
                    placeholder="Openings"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, openings: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Salary :
                </Label>
                <Col sm={8}>
                  <Input
                    id="exampleEmail"
                    name="openings"
                    placeholder="Salary"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, salary: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button type="submit" className="bg-success" style={{ marginLeft: '7em' }}>
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      {/* add company */}

      <div style={{ width: "100%" }}>
        <Modal isOpen={modal2} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Add Company</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={handleClick6}>
              <FormGroup row>
                <Label for="CompanyEmail" sm={4}>
                  Email :
                </Label>
                <Col sm={8}>
                  <Input
                    id="companyEmail"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    onChange={(e) =>
                      setFormData2({ ...formData2, email: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Location" sm={4}>
                  Location :
                </Label>
                <Col sm={8}>
                  <Input
                    id="Location"
                    name="Location"
                    placeholder="Company Location"
                    type="Location"
                    onChange={(e) =>
                      setFormData2({ ...formData2, location: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={4}>
                  Company Name :
                </Label>
                <Col sm={8}>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Company Name"
                    type="text"
                    onChange={(e) =>
                      setFormData2({
                        ...formData2,
                        n: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={4}>
                  About :
                </Label>
                <Col sm={8}>
                  <Input
                    id="about name"
                    name="aboutNAme"
                    placeholder="About Company"
                    type="text"
                    onChange={(e) =>
                      setFormData2({ ...formData2, about: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button className="bg-success" style={{ marginLeft: '6em' }}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
