import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "../../components/shared/custom-fields/InputField/InputField";
import * as Yup from "yup";
import { FaHome, FaPhone } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
export default function ContactUs(props) {
  const initialValues = {
    Email: "",
    Name: "",
    Phone: "",
    Message: "",
  };

  const validationSchema = Yup.object().shape({
    Email: Yup.string().required("This field is require."),
    Name: Yup.string().required("Name is require."),
    Phone: Yup.string().required("Phone is require."),
    Message: Yup.string().required("Message is require."),
  });

  const handleSubmit = async (values) => {
    console.log("ok");
  };
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6}>
          <div>
            <h2>Contact form</h2>
            <p>
              In case you have any wonder, please use this form to contact us
              and we will get back to you as soon as possible.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                // do somethings
                const { values, errors, touched, isSubmitting } = formikProps;
                // console.log({values, errors, touched})

                return (
                  <Form className="">
                    <FastField
                      name={"Email"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Your Email"}
                    />
                    <FastField
                      name={"Name"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Your Name"}
                    />
                    <FastField
                      name={"Phone"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Phone"}
                    />
                    <FastField
                      name={"Message"}
                      component={InputField}
                      type={"text"}
                      placeholder={"Your Message"}
                    />

                    <Button variant="primary btn-block" type="submit">
                      Sent email
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <div style={{ marginLeft: "30px" }}>
            <h2>Location</h2>
            <div>
              {" "}
              <FaHome className="m-r-10" /> Ha Noi, Viet Nam
            </div>
            <div>
              {" "}
              <FaPhone className="m-r-10" /> +84 686 868 999
            </div>
            <div className="m-b-10">
              {" "}
              <FiMail className="m-r-10" /> Oganuceic@gmail.com{" "}
            </div>
            <iframe
              style={{ border: 0 }}
              width="600"
              height="450"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7176305540584!2d105.83991261488299!3d21.003953086011858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac775d1a29b1%3A0x47ca351d075745a6!2zNTUgR2nhuqNpIFBow7NuZywgxJDhu5NuZyBUw6JtLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1628134118371!5m2!1svi!2s"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
