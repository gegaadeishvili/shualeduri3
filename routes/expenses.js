const {Router} = require('express')
const Expense = require('../models/Expense')
const router = Router()

router.get('/', async (req, res)=>{
    const expenses = await Expense.find({}).lean()
    console.log(expenses)
    res.render('index', {
        page_title: 'Expenses list',
        isIndex: true,
        expenses: expenses
    })
})

router.get('/create', (req, res)=>{
    res.render('create', {
        page_title: 'Create expense',
        isCreate: true
    })
})

router.post('/create', async (req, res)=>{
    const expense = new Expense({
        title: req.body.title,
        money_amount: req.body.money_amount,
        category: req.body.category
    })

    const saved_expense = await expense.save()
    console.log(saved_expense)
    res.redirect('/')
})

router.post('/edit', async (req, res)=>{
    const expense = await Expense.findById(req.body.id)
    expense.title = req.body.title
    expense.money_amount = req.body.money_amount
    expense.category = req.body.category
    console.log(expense)
    const saved_expense = await expense.save()
    res.redirect('/')
})

router.post('/delete', async (req, res)=>{
    const expense = await Expense.findByIdAndDelete(req.body.id) 
    console.log(expense)
    res.redirect('/')
})

module.exports = router