import React, { Component } from "react";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      lastName: "",
      firstName: "",
      age: "",
      job: "",
      address: "",
      data: [],
      searchData: [],
      editInput: {},
      isOpen: false,
    };
  }

  openModal = () => {
    this.setState({
      isOpen: true,
      lastName: "",
      firstName: "",
      age: "",
      job: "",
      address: "",
    });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, age, job, address, data, searchData } =
      this.state;
    const NewUser = {
      id: Date.now(),
      lastName,
      firstName,
      age,
      job,
      address,
    };
    this.setState({
      data: [...data, NewUser],
      searchData: [...searchData, NewUser],
      lastName: "",
      firstName: "",
      age: "",
      job: "",
      address: "",
      isOpen: false,
    });
  };

  Delete = (id) => {
    const newData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: newData });
  };

  onFilter = (e) => {
    const searchText = e.target.value.toLowerCase();

    const search = this.state.searchData.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(searchText) ||
        item.lastName.toLowerCase().includes(searchText) ||
        item.age.toLowerCase().includes(searchText) ||
        item.job.toLowerCase().includes(searchText) ||
        item.address.toLowerCase().includes(searchText)
      );
    });

    this.setState({ data: search });
  };

  onEdit = (item) => {
    this.setState({
      editInput: item,
      lastName: item.lastName,
      firstName: item.firstName,
      age: item.age,
      job: item.job,
      address: item.address,
    });
  };

  onUppdate = () => {
    const ress = this.state.data.map((value) => {
      if (value.id === this.state.editInput.id) {
        return {
          ...value,
          lastName: this.state.lastName,
          firstName: this.state.firstName,
          age: this.state.age,
          job: this.state.job,
          address: this.state.address,
        };
      }
      return value;
    });

    const updatedSearch = this.state.searchData.map((value) => {
      if (value.id === this.state.editInput.id) {
        return {
          ...value,
          lastName: this.state.lastName,
          firstName: this.state.firstName,
          age: this.state.age,
          job: this.state.job,
          address: this.state.address,
        };
      }
      return value;
    });

    this.setState({ data: ress, searchData: updatedSearch, editInput: {} });
  };

  render() {
    return (
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Search users..."
              onChange={this.onFilter}
              className="w-full md:w-1/2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={this.openModal}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:opacity-90 transition w-full md:w-auto"
            >
              + New User
            </button>
          </div>

          {this.state.isOpen && (
            <div className="fixed inset-0 bg-black/40 dark:bg-white/10 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-neutral-900 w-full max-w-md mx-4 sm:mx-0 rounded-lg p-6 shadow-xl space-y-4">
                <h2 className="text-lg font-semibold">Create New User</h2>
                <form onSubmit={this.onFormSubmit} className="space-y-3">
                  <input
                    name="lastName"
                    onChange={this.onInputChange}
                    value={this.state.lastName}
                    placeholder="LastName"
                    className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    name="firstName"
                    onChange={this.onInputChange}
                    value={this.state.firstName}
                    placeholder="FirstName"
                    className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    name="age"
                    onChange={this.onInputChange}
                    value={this.state.age}
                    placeholder="Age"
                    className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    name="job"
                    onChange={this.onInputChange}
                    value={this.state.job}
                    placeholder="Job"
                    className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    name="address"
                    onChange={this.onInputChange}
                    value={this.state.address}
                    placeholder="Address"
                    className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      type="button"
                      onClick={this.closeModal}
                      className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-md hover:opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-left">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    {[
                      "id",
                      "lastName",
                      "firstName",
                      "age",
                      "job",
                      "address",
                    ].map((value) => (
                      <td key={value} className="px-4 py-2">
                        {this.state.editInput.id === item.id &&
                        value !== "id" ? (
                          <input
                            onChange={this.onInputChange}
                            name={value}
                            value={this.state[value]}
                            className="w-full px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600"
                          />
                        ) : (
                          item[value]
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => this.Delete(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                      {this.state.editInput.id === item.id ? (
                        <button
                          onClick={this.onUppdate}
                          className="text-blue-600 hover:underline"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => this.onEdit(item)}
                          className="text-gray-600 dark:text-gray-300 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
