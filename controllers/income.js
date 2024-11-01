const IncomeSchema = require("../models/incomemodel");

const addIncome = async (req, res) => {
    const { title, amount, description, date, category } = req.body;

    // Parse the date manually in "DD-MM-YYYY" format
    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Check if the date is valid
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD format." });
    }

    const inc = new IncomeSchema({
        title,
        amount,
        description,
        date: parsedDate,
        category
    });

    try {
        // Validation checks
        if (!title || !description || !category || !amount || !date) {
            return res.status(400).json({ message: "Some fields are missing" });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Income must be a positive number" });
        }

        await inc.save();
        res.status(200).json({ message: "Income added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding income", error: error.message });
    }

    console.log(inc);
};

const getIncome = async (req, res) => {
    try{
const incomes=await IncomeSchema.find().sort({createdAt: -1});
res.status(200).json(incomes)
    }
    catch(error){
        res.status(500).json({message: "Server Error"});

    }
}

const deleteIncome = async (req, res) => {
    const id = req.params.id; // Extract the 'id' from req.params

    try {
        const income = await IncomeSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const editIncome = async (req, res) => {
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

        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports = {addIncome,getIncome,deleteIncome,editIncome}
