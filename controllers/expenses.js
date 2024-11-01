const ExpenseSchema = require("../models/expensemodel");

const addExpense = async (req, res) => {
    const { title, amount, description, date, category } = req.body;
    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD format." });
    }
    const inc = new ExpenseSchema({
        title,
        amount,
        description,
        date: parsedDate,
        category
    });

    try {
        if (!title || !description || !category || !amount || !date) {
            return res.status(400).json({ message: "Some fields are missing" });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Expense must be a positive number" });
        }

        await inc.save();
        res.status(200).json({ message: "Expense added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding Expense", error: error.message });
    }

    console.log(inc);
};

const getExpense = async (req, res) => {
    try{
const expense=await ExpenseSchema.find().sort({createdAt: -1});
res.status(200).json(expense)
    }
    catch(error){
        res.status(500).json({message: "Server Error"});

    }
}

const deleteExpense= async (req, res) => {
    const id = req.params.id; // Extract the 'id' from req.params

    try {
        const exp = await ExpenseSchema.findByIdAndDelete(id);
        if (!exp) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const editExpense = async (req, res) => {
    const id = req.params.id; // Extract the 'id' from req.params
    const { title, category, amount, date, description } = req.body;

    try {
          const updateFields = {};
        if (title){
            updateFields.title = title;
            console.log(title)
        } 
        if (category){
            updateFields.category = category;
            console.log(category)
        } 
        if (amount){
            updateFields.amount = amount;
           console.log(amount) 
        } 
        if (date){
            updateFields.date = new Date(date);
            console.log(date);
        } 
        if (description){
            updateFields.description = description;
            console.log(description)
        } 

        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports = {addExpense,getExpense,deleteExpense,editExpense}
