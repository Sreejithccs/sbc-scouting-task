import { MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Field, Formik } from "formik";
import React from "react";
import data from "../lib/categories.json";
import { Startup } from "../types/startup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BasicModal({
  open,
  modalData,
  onModalClose,
  onSubmit,
}: {
  open: boolean;
  onModalClose: () => void;
  modalData: Startup;
  onSubmit: any;
}) {
  const [selectedCategories, setSelectedCategories] = React.useState(
    modalData.category || []
  );

  const handleChangeSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Formik
              initialValues={modalData}
              validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                  errors.name = "Name is required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log("valuesssss: ", values);
                setTimeout(() => {
                  setSubmitting(false);
                  values.category = selectedCategories || values.category;
                  onSubmit(values);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item container xs={12}>
                      <Grid item xs={2}>
                        <label htmlFor="name" className="form-label">
                          <span>ID </span>
                          <span>:</span>
                        </label>
                      </Grid>
                      <Grid item xs={10}>
                        <Field
                          className="form-control custom-form-control-input"
                          id="id"
                          name="id"
                          placeholder="ID"
                          value={values.id}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                      <Grid item xs={2}>
                        <label htmlFor="name" className="form-label">
                          <span>Name</span> <span>:</span>{" "}
                        </label>
                      </Grid>
                      <Grid item xs={10}>
                        <Field
                          className="form-control custom-form-control-input"
                          id="name"
                          name="name"
                          placeholder="Name"
                          value={values.name}
                        />
                      </Grid>
                    </Grid>
                    {errors.name && touched.name && errors.name}
                    <Grid item xs={12} container>
                      <Grid item xs={2}>
                        <label htmlFor="description" className="form-label">
                          <span>Description</span> <span>:</span>{" "}
                        </label>
                      </Grid>
                      <Grid item xs={10}>
                        <Field
                          className="form-control custom-form-control-input"
                          id="description"
                          name="description"
                          as="textarea"
                          placeholder="Description"
                          value={values.description}
                        />
                      </Grid>
                    </Grid>
                    {errors.description &&
                      touched.description &&
                      errors.description}
                    <Grid
                      item
                      xs={12}
                      container
                      // classes={{
                      //   root: "custom-form-control",
                      // }}
                    >
                      <Grid item xs={2}>
                        <label htmlFor="category" className="form-label">
                          <span>Category</span>
                          <span>:</span>
                        </label>
                      </Grid>
                      <Grid item xs={10}>
                        {/* <Field
                          className="form-control custom-form-control-input"
                          type="category"
                          name="category"
                          placeholder="Category"
                        /> */}
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={selectedCategories}
                          onChange={handleChangeSelect}
                          input={
                            <OutlinedInput name="Category" label="Category" />
                          }
                          MenuProps={MenuProps}
                          className="form-select"
                          // className="custom-form-control-input-item"
                        >
                          {data.map((category) => (
                            <MenuItem
                              key={category.value}
                              value={category.value}
                              id="category"
                            >
                              {category.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      {/* {selectComponent} */}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      // classes={{
                      //   root: "custom-form-control",
                      // }}
                    >
                      <Grid
                        item
                        xs={12}
                        container
                        // classes={{
                        //   root: "custom-form-control",
                        // }}
                      >
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            Submit
                          </button>
                          <button
                            type="submit"
                            className="btn btn-secondory"
                            onClick={onModalClose}
                          >
                            Cancel
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
