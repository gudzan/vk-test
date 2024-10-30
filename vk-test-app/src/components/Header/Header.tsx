import React from 'react';
import { Typography, AppBar, Toolbar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSort } from '../../hooks/useSort';

const Header = () => {
  const { sort, setSortField, setSortOrder } = useSort();

  const handleChangeSortOrder = (e: SelectChangeEvent) => {
    console.log(e.target.value);

    const value = e.target.value;
    setSortOrder(value);
  }

  const handleChangeSortField = (e: SelectChangeEvent) => {
    console.log(e.target.value);

    const value = e.target.value;
    setSortField(value);
  }

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar className='appBar-box'>
          <Typography variant="h5">
            sort by
          </Typography>
          <Select
            id="sortField"
            value={sort.sortField}
            onChange={handleChangeSortField}
            className='appBar-select'>
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"forks"}>Fork</MenuItem>
            <MenuItem value={"stars"}>Stars</MenuItem>
          </Select>
          <Select
            id="sortOrder"
            value={sort.sortOrder}
            onChange={handleChangeSortOrder}
            className='appBar-select'>
            <MenuItem value={"asc"}>asc</MenuItem>
            <MenuItem value={"desc"}>desc</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  )
}

export default Header;
