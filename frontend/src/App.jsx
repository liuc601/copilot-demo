import React from 'react'

export default function App() {
    return (
        <div className="app">
            <header className="hero">
                <h1>欢迎来到 My Trip Site</h1>
                <p>探索目的地、查看线路、快速下单（模拟支付）</p>
            </header>

            <main className="content">
                <section className="cards">
                    <div className="card">示例线路 A</div>
                    <div className="card">示例线路 B</div>
                    <div className="card">示例线路 C</div>
                </section>
            </main>

            <footer className="foot">© 2025 My Trip Site</footer>
        </div>
    )
}
