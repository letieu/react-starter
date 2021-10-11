import React from "react";
import PropTypes from "prop-types";
import TablePaginate from "components/TablePaginate/TablePaginate";
import Select from "components/Select/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { companyService } from "services/companyService";
import { makeStyles, Switch } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { DeleteForever, Visibility } from "@material-ui/icons";
import useConfirm from "hooks/useConfirm";

const useStyles = makeStyles({
  filter: {
    display: "flex",
    gap: "40px",
  },
});

export default function CompanyIndex() {
  const classes = useStyles();
  const [confirm, showConfirm] = useConfirm();
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [activated, setActivated] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [size] = React.useState(10);
  const [count, setCount] = React.useState(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: Description,
      },
      {
        Header: "Active",
        accessor: "activated",
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

  async function fetchCompanies() {
    try {
      const { data } = await companyService.list({
        search,
        page,
        size,
        activated,
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
      await companyService.remove(id);
      await fetchCompanies();
      alert("done");
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    fetchCompanies();
  }, [page, search, activated]);

  return (
    <div>
      {confirm}
      <Link to="/admin/company/create">
        <Button color="info">Create new company</Button>
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
          value={activated}
          onChange={setActivated}
          options={[
            { value: "", label: "ALL" },
            { value: "true", label: "ACTIVATED" },
            { value: "false", label: "UN ACTIVE" },
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
      checked={cell.value}
      inputProps={{ "aria-label": "controlled" }}
      color="primary"
    />
  );
}

Active.propTypes = {
  cell: PropTypes.any,
};

function Description({ cell }) {
  return (
    <div style={{ height: "30px", overflow: "hidden" }}>
      <ReactQuill value={cell.value} readOnly={true} theme={"bubble"} />{" "}
    </div>
  );
}

Description.propTypes = {
  cell: PropTypes.any,
};

function Action({ cell, handleDelete }) {
  return (
    <div className="actions-right">
      <Link to={"/admin/company/" + cell.row.original._id}>
        <Button
          justIcon
          round
          simple
          //onClick={() => {
          //let obj = data.find((o) => o.id === key);
          //}}
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
