const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

// Basic health
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'mcp-server' })
})

// Tools capability list
app.get('/mcp/tools', (req, res) => {
    res.json({
        code: 0,
        message: 'ok',
        data: [
            { name: 'list_issues', description: 'List GitHub issues for a repo' },
            { name: 'create_issue', description: 'Create a new GitHub issue' }
        ]
    })
})

// Simple in-memory issues store (mock)
let issues = [
    { id: 1, title: 'seed issue 1', body: 'example issue', state: 'open' }
]

app.get('/mcp/issues', (req, res) => {
    res.json({ code: 0, message: 'ok', data: issues })
})

app.post('/mcp/issues', (req, res) => {
    const { title, body } = req.body || {}
    if (!title) return res.status(400).json({ code: 1, message: 'title required' })
    const id = issues.length + 1
    const issue = { id, title, body, state: 'open' }
    issues.push(issue)
    res.json({ code: 0, message: 'created', data: issue })
})

// Serve contracts
app.get('/mcp/contracts', (req, res) => {
    const dir = path.join(__dirname, 'contracts')
    try {
        const files = fs.readdirSync(dir)
        const data = files.map(f => ({ file: f, content: fs.readFileSync(path.join(dir, f), 'utf8') }))
        res.json({ code: 0, message: 'ok', data })
    } catch (e) {
        res.json({ code: 1, message: 'no contracts' })
    }
})

app.listen(PORT, () => {
    console.log(`MCP server listening on http://localhost:${PORT}`)
})
