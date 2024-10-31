const ItemModel = require("../Models/item");
const nodemailer = require("nodemailer");
const AddItem  = async (req, res) => {
  try {
    const result = await ItemModel.create({
      Name: req.body.Name,
      Salary: req.body.Salary,
      Category: req.body.Category,
      Description: req.body.Description,
      Image: req.file.path,
    })
    return res
      .status(200)
      .json({ Message: "new item addes successfully", result });
  } catch (error) {
    if (error.name === "ValidationError") {
      for (const field in error.errors) {
        return res.status(400).json({ Message: error.errors[field].message });
      }
    } else {
      console.log(error);
      return res.status(501).json({ Message: "An error occurred", error });
    }
  }
};
const Menu = async (req, res) => {
  try {
    const result = await ItemModel.find({}, { __v :0});
     return res
       .status(200)
       .json({ Message: "all menu", result });
  }
  catch(error)
  {
    return res.status(501).json({ Message: "An error occurred", error });
    
  }
}
const MenuFilter = async (req, res) => {
  try {
    const result = await ItemModel.find({"Category":req.params.category }, { __v: 0 });
    return res.status(200).json({ Message: "all menu", result });
  } catch (error) {
    return res.status(501).json({ Message: "An error occurred", error });
  }
}
module.exports = {
  AddItem,Menu,MenuFilter
};
