const errorConfig = {
  title: [
    { required: true, message: "Please Enter title" },
    { minLength: 5, message: "Title should be atlist 5 character" },
  ],
  category: [{ required: true, message: "Please select category" }],
  amount: [{ required: true, message: "Please Enter amount" }],
};

export { errorConfig };
