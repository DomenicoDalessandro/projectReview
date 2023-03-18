import { getBanner, deleteBanner, insertBanner, putBanner } from "../api";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
const BannerForm = () => {
  const [banner, setBanner] = useState([]);
  const [insert, setInsert] = useState({ name: "" });

  const handleInputChange = (input, value) => {
    setInsert({ ...insert, [input]: value });
  };
  const getAllBanners = async () => {
    const result = await getBanner();
    if (result.ok) {
      setBanner(result.data);
    }
  };
  useEffect(() => {
    getAllBanners();
  }, []);
  const handleDelete = async (id) => {
    const result = await deleteBanner(id);
    getAllBanners();
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await insertBanner(insert);
    if (result.ok) {
      getAllBanners();
      setInsert({ name: "" });
    }
  };
  const [boolean, setBoolean] = useState(true);

  const [id, setId] = useState("");
  const [modify, setModify] = useState("");
  const change = (elementId) => {
    setId(elementId);
    setBoolean(!boolean);
    const temp = banner.filter((el) => {
      return el.id == elementId;
    });
    setModify(temp[0]);
  };
  const handleInputChangeM = (input, value) => {
    setModify({ ...modify, [input]: value });
  };
  const handlePutSubmit = async (event) => {
    event.preventDefault();
    const result = await putBanner(modify, id);
    if (result.ok) {
      getAllBanners();
      setBoolean(!boolean);
    }
  };

  return (
    <>
      {boolean ? (
        <ListGroup>
          <Form
            className="col-12 col-sm-6 col-lg-4"
            onSubmit={handleFormSubmit}
          >
            <Form.Group controlId="name">
              <Form.Label>Nome Banner</Form.Label>
              <Form.Control
                type="text"
                required
                value={insert.name}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>

            <div className="m-3">
              <Button type="submit">Save</Button>
            </div>
          </Form>
          {banner.map((b) => {
            return (
              <ListGroupItem key={b.id}>
                {b.name}{" "}
                <ButtonGroup>
                  <Button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      change(b.id);
                    }}
                  >
                    <AiFillEdit />
                  </Button>
                  <Button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      handleDelete(b.id);
                    }}
                  >
                    <AiOutlineDelete />
                  </Button>
                </ButtonGroup>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      ) : (
        <Form className="col-12 col-sm-6 col-lg-4" onSubmit={handlePutSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Modifica</Form.Label>
            <Form.Control
              type="text"
              required
              value={modify.name}
              onChange={(e) => {
                handleInputChangeM(e.target.id, e.target.value);
              }}
            />
          </Form.Group>
          <div className="mt-3">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default BannerForm;
