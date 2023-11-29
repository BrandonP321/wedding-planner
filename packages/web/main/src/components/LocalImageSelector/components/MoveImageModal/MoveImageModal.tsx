import React, { useEffect } from "react";
import {
  Button,
  FormActions,
  FormField,
  FormikForm,
  Header,
  Modal,
  NumberInput,
  SubmitButton,
} from "@wedding-planner/shared/web/components";
import { Form, useFormikContext } from "formik";

type Values = { position: number };

export type MoveImageModalProps = {
  imageIndex: number;
  totalImages: number;
  show: boolean;
  toggleShow: () => void;
  handleSave: (to: number) => void;
};

export const MoveImageModal = (props: MoveImageModalProps) => {
  const { handleSave } = props;

  return (
    <FormikForm
      initialValues={{ position: 0 }}
      onSubmit={(v) => handleSave(v.position - 1)}
    >
      <ModalContent {...props} />
    </FormikForm>
  );
};

const ModalContent = (props: MoveImageModalProps) => {
  const { show, toggleShow, totalImages, imageIndex } = props;

  const { submitForm, resetForm } = useFormikContext<Values>();

  useEffect(() => {
    resetForm({ values: { position: imageIndex + 1 } });
  }, [imageIndex]);

  return (
    <Modal
      title={
        <Header
          title="Move image"
          description="Change the position of this image."
          variant="h2"
        />
      }
      show={show}
      toggleShow={toggleShow}
      footer={
        <FormActions>
          <Button onClick={toggleShow}>Cancel</Button>
          <SubmitButton onClick={submitForm}>Save</SubmitButton>
        </FormActions>
      }
    >
      <Form>
        <FormField label="Position" name="position">
          <NumberInput min={1} max={totalImages} />
        </FormField>
      </Form>
    </Modal>
  );
};
