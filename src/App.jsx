import { useEffect, useMemo, useState } from 'react'

const notices = [
  {
    level: 'danger',
    title: '关于不正当竞争行为的严正声明',
    text: '最近我们发现有人在其他公益服刷我们服务器的地址，此问题并非我们服务器人所致。截止至2024.12受害服务器已经确认有25+，请各位理智并谨防上当。',
  },
  {
    level: 'warning',
    title: '关于冒充BeForever诈捐的注意事项',
    text: '我们不会要求或接受任何形式的赞助。任何以 BeForever 名义收款的行为都不是官方行为，请谨防受骗。',
  },
  {
    level: 'info',
    title: '关于服务器启用白名单机制的说明',
    text: '为避免恶意影响，服务器启用白名单机制，新玩家需要联系 QQ 管理员进行注册。',
  },
]

const gameSections = [
  {
    title: '热门游戏',
    items: [
      ['幸运方块起床', '竞赛类', '保护你的床并反击敌队'],
      ['战墙X', '竞赛类', '墙倒后争夺资源与凋零'],
      ['空岛战争', '竞赛类', '空岛生存与战斗到最后'],
      ['TNTrun', '休闲类', '脚下方块持续消失的跑酷'],
      ['CS:GO', '枪战类', '经典模式复刻，材质包可在主页下载'],
    ],
  },
  {
    title: '迷你游戏',
    items: [
      ['战桥突围', '竞战类', '桥上攻防，突破得分'],
      ['大逃杀', '枪战类', '跳伞搜刮、毒圈收缩、生存到最后'],
      ['UHC', '生存类', '原版硬核生存对抗'],
      ['躲猫猫', '休闲类', '伪装与搜寻的阵营对抗'],
      ['谁是杀手', '休闲类', '多身份推理与对抗'],
    ],
  },
]

const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')

function App({ page }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  })

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') return themeMedia.matches ? 'dark' : 'light'
    return theme
  }, [theme])

  useEffect(() => {
    const onChange = () => {
      if (theme === 'system') {
        document.documentElement.dataset.theme = themeMedia.matches ? 'dark' : 'light'
      }
    }
    themeMedia.addEventListener('change', onChange)
    return () => themeMedia.removeEventListener('change', onChange)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    localStorage.setItem('theme', theme)
  }, [resolvedTheme, theme])

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">BeForever</div>
        <nav className="nav">
          <a className={page === 'home' ? 'active' : ''} href="/index.html">主页</a>
          <a href="https://qm.qq.com/q/XZTGyQOKo8" target="_blank" rel="noreferrer">QQ群</a>
          <a href="https://kaihei.co/wnwxZK" target="_blank" rel="noreferrer">开黑啦</a>
          <a className={page === 'about' ? 'active' : ''} href="/about.html">服务器介绍</a>
          <a className={page === 'games' ? 'active' : ''} href="/games.html">小游戏列表</a>
        </nav>
        <div className="theme-switch">
          <button type="button" onClick={() => setTheme('light')} className={theme === 'light' ? 'picked' : ''}>浅色</button>
          <button type="button" onClick={() => setTheme('dark')} className={theme === 'dark' ? 'picked' : ''}>深色</button>
          <button type="button" onClick={() => setTheme('system')} className={theme === 'system' ? 'picked' : ''}>跟随系统</button>
        </div>
      </header>

      <main className="container">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutPage />}
        {page === 'games' && <GamesPage />}
      </main>

      <footer className="footer">Copyright © BeForever. All rights reserved.</footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
      {notices.map((n) => (
        <section key={n.title} className={`notice ${n.level}`}>
          <h3>{n.title}</h3>
          <p>{n.text}</p>
        </section>
      ))}

      <section className="hero">
        <h1>欢迎游玩 BeForever 公益服</h1>
        <p className="version">支持版本：1.12~</p>
        <p className="address">play.beforever.top</p>
        <div className="actions">
          <a href="https://ck-1252779578.cos.ap-shanghai.myqcloud.com/beforever/%E5%A4%A7%E9%80%83%E6%9D%80%E6%9D%90%E8%B4%A8%28%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%B7%B2%E8%87%AA%E5%B8%A6%29.zip" target="_blank" rel="noreferrer">下载大逃杀所需材质</a>
          <a href="https://ck-1252779578.cos.ap-shanghai.myqcloud.com/beforever/CSGO%E6%9D%90%E8%B4%A8%E5%8C%85%28%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%B7%B2%E8%87%AA%E5%B8%A6%29.zip" target="_blank" rel="noreferrer">下载CSGO所需材质</a>
        </div>
        <p>7年前，因为对MC的热爱，所以我们相聚在一起。</p>
        <img src="/images/BeForever.png" alt="BeForever" width="256" />
      </section>

      <section className="cards">
        <a className="card" href="/about.html">
          <h2>服务器介绍</h2>
          <p>了解服务器包含的内容</p>
        </a>
        <a className="card" href="/games.html">
          <h2>小游戏列表</h2>
          <p>从这里找找您喜欢的小游戏</p>
        </a>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <section className="article">
      <p className="center"><img src="/images/BeForever.png" alt="BeForever" width="256" /></p>
      <h1>BeForever小游戏</h1>
      <p>服务器类型：纯小游戏服</p>
      <p>服务器主版本：1.20.4</p>
      <p>支持版本：1.12~</p>
      <p><strong>BeForever的含义：</strong>“Best friend / Boyfriend / Baby's father / Be Forever”。</p>
      <p><strong>服务器起源：</strong>从早期断续开服到重新长期运营，源于玩家支持与坚持。</p>
      <h2>服务器特色</h2>
      <ul>
        <li>支持手机游玩，可与朋友一起组队。</li>
        <li>多样化加入方式，可通过 NPC 或牌子加入游戏。</li>
        <li>长期开放并持续更新地图与玩法。</li>
        <li>高频 CPU，降低卡顿体验。</li>
      </ul>
      <p><strong>服务器规则：</strong>禁止开挂、禁止破坏场地，文明发言。</p>
      <p>更多详细玩法可在“小游戏列表”页面查看。</p>
    </section>
  )
}

function GamesPage() {
  return (
    <div className="games">
      {gameSections.map((section) => (
        <section key={section.title}>
          <h1>{section.title}</h1>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>类型</th>
                  <th>介绍</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item[0]}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <section className="survival">
        <h1>生存服</h1>
        <p><img src="/icons/survival/64px.png" alt="生存服" width="64" /></p>
        <p>独立生存服务器</p>
      </section>
    </div>
  )
}

export default App
