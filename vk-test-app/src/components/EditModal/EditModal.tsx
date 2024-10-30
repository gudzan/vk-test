import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./EditModal.module.css"
import Overlay from "../Overlay/Overlay";
import { TextField } from "@mui/material";
import Repository from "../../types/repository";

type EditModalProps = {
  open: boolean;
  closeEditModal: Function;
  edit: Function
  repository: Repository
};

const EditModal = ({ open, closeEditModal, repository, edit }: EditModalProps) => {
  const [editRepositories, setEditRepositories] = useState(repository)
  const modalClassName = `${styles.modal} ${open ? `${styles.open}` : ""}`

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    edit(editRepositories)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditRepositories((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <Overlay openOverlay={open} closeOverlay={() => closeEditModal()} />
      <div className={modalClassName}>
        <button type="button" className={`${styles.icon} ${styles.modal__close}`} onClick={() => closeEditModal()}><CloseIcon /></button>
        <form className={styles.modal__form} onSubmit={handleSubmit}>
          <span className={styles.modal__title}>Радактирование</span>
          <TextField
            name="name"
            type="text"
            variant='outlined'
            color='secondary'
            label="Name"
            onChange={onChange}
            value={editRepositories.name}
            fullWidth
            required
          />
          <TextField
            name="description"
            multiline
            maxRows="5"
            minRows="5"
            type="text"
            variant='outlined'
            color='secondary'
            label="Description"
            onChange={onChange}
            value={editRepositories.description}
            fullWidth
            required
          />
          <TextField
            name="forks_count"
            type="number"
            variant='outlined'
            color='secondary'
            label="Forks"
            onChange={onChange}
            value={editRepositories.forks_count}
            fullWidth
            required
          />
          <TextField
            name="stargazers_count"
            type="number"
            variant='outlined'
            color='secondary'
            label="Stars"
            onChange={onChange}
            value={editRepositories.stargazers_count}
            fullWidth
            required
          />
          <TextField
            name="watchers"
            type="number"
            variant='outlined'
            color='secondary'
            label="Watchers"
            onChange={onChange}
            value={editRepositories.watchers}
            fullWidth
            required
          />
          <button type="submit" className={styles.modal__submit}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default EditModal