import React from "react";
import PropTypes from "prop-types";
import TablePaginate from "components/TablePaginate/TablePaginate";
import Select from "components/Select/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { userService } from "services/userService";
import { makeStyles, Switch } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import {DeleteForever, Edit, Visibility} from "@material-ui/icons";
import useConfirm from "hooks/useConfirm";
import {toast} from "react-toastify";

const useStyles = makeStyles({
  filter: {
    display: "flex",
    gap: "40px",
  },
});

export default function UserIndex() {
  const classes = useStyles();
  const [confirm, showConfirm] = useConfirm();
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [size] = React.useState(10);
  const [count, setCount] = React.useState(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Fullname",
        accessor: "title",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "status",
        accessor: "status",
        Cell: Active,
      },
      {
        Header: "Action",
        Cell: function remove({ cell }) {
          return (
            <Action
              cell={cell}
              handleDelete={(row) =>
                showConfirm("Are you sure remove ?", () =>
                  handleDelete(row._id)
                )
              }
            />
          );
        },
      },
    ],
    []
  );

  async function fetchUsers() {
    try {
      const { data } = await userService.list({
        search,
        page,
        size,
        status,
      });
      setItems(data.items);
      setCount(data.paginate.count);
      setPage(data.paginate.page);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDelete(id) {
    try {
      await userService.remove(id);
      await fetchUsers();
      toast.success("Deleted user");
    } catch (e) {
      console.log(e);
      toast.error("Cannot delete user");
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, [page, search, status]);

  return (
    <div>
      {confirm}
      <Link to="/admin/user/create">
        <Button color="info">Create new User</Button>
      </Link>

      <div className={classes.filter}>
        <CustomInput
          labelText="Search"
          id="search"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: search,
            onChange: (e) => setSearch(e.target.value),
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Select
          label={"Status"}
          value={status}
          onChange={setStatus}
          options={[
            { value: "", label: "ALL" },
            { value: "active", label: "ACTIVATED" },
            { value: "unactive", label: "BLOCKED" },
          ]}
        />
      </div>

      <TablePaginate
        count={count}
        page={page}
        setPage={setPage}
        size={size}
        columns={columns}
        data={items}
      />
    </div>
  );
}

function Active({ cell }) {
  return (
    <Switch
      checked={cell.value == "active"}
      inputProps={{ "aria-label": "controlled" }}
      color="primary"
    />
  );
}

Active.propTypes = {
  cell: PropTypes.any,
};

function Action({ cell, handleDelete }) {
  return (
    <div className="actions-right">
      <Link to={"/admin/user/edit/" + cell.row.original.id}>
        <Button
          justIcon
          round
          simple
          color="warning"
          className="edit"
        >
          <Edit />
        </Button>
      </Link>
      <Link to={"/admin/user/" + cell.row.original.id}>
        <Button
          justIcon
          round
          simple
          color="success"
          className="edit"
        >
          <Visibility />
        </Button>
      </Link>
      <Button
        justIcon
        round
        simple
        onClick={() => handleDelete(cell.row.original)}
        color="danger"
        className="remove"
      >
        <DeleteForever />
      </Button>{" "}
    </div>
  );
}

Action.propTypes = {
  cell: PropTypes.any,
  handleDelete: PropTypes.func,
};
