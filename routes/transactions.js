const {addIncome,getIncome,deleteIncome,editIncome} = require('../controllers/income');
const {addExpense,getExpense,deleteExpense,editExpense}=require('../controllers/expenses')

const router=require('express').Router()

//income routes
router.post('/add-income',addIncome);
router.get('/get-income',getIncome);
router.delete('/delete-income/:id',deleteIncome); 
router.patch('/update-income/:id',editIncome);

//expense routes
router.post('/add-expense',addExpense);
router.get('/get-expense',getExpense);
router.delete('/delete-expense/:id',deleteExpense); 
router.patch('/update-expense/:id',editExpense);


module.exports=router;