import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './EditModal.scss'
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
  const [newRepositories, setNewRepositories] = useState(repository)
  const newChatClassName = `new-repo ${open ? "open" : ""}`

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    edit(newRepositories)
  }
  console.log(newRepositories.name, newRepositories.description);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name);

    setNewRepositories((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <Overlay openOverlay={open} closeOverlay={() => closeEditModal()} />
      <div className={newChatClassName}>
        <button type="button" className="icon new-repo__close" onClick={() => closeEditModal()}><CloseIcon /></button>
        <form className="new-repo__form" onSubmit={handleSubmit}>
          <span className="new-repo__title">Радактирование</span>
          <TextField
            name="name"
            type="text"
            variant='outlined'
            color='secondary'
            label="Name"
            onChange={onChange}
            value={newRepositories.name}
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
            value={newRepositories.description}
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
            value={newRepositories.forks_count}
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
            value={newRepositories.stargazers_count}
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
            value={newRepositories.watchers}
            fullWidth
            required
          />
          <button type="submit" className="new-repo__submit">Сохранить</button>
        </form>
      </div>
    </>
  )
}

export default EditModal