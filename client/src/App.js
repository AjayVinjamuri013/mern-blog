import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className='logo'>MyBlog</a>
        <nav>
          <a href=''>Login</a>
          <a href=''>Register</a>
        </nav>
      </header>
      <div className='post'>
        <div className="image">
          <img src="https://www.w3.org/TR/css3-flexbox/images/flex-pack.svg" alt=""></img>
        </div>
        <div className="texts">
          <h2>Title</h2>
          <p className="info">
            <a className="author">Ajay</a>
            <time>2023-01-01 10:40</time>
          </p>
          <p className="summary">In this tutorial, I'm going to show you how to build a fullstack blog app </p>
        </div> 
      </div>
      <div className='post'>
        <div className="image">
          <img src="https://www.w3.org/TR/css3-flexbox/images/flex-pack.svg" alt=""></img>
        </div>
        <div className="texts">
          <h2>Title</h2>
          <p className="info">
            <a className="author">Ajay</a>
            <time>2023-01-01 10:40</time>
          </p>
          <p className="summary">In this tutorial, I'm going to show you how to build a fullstack blog app </p>
        </div> 
      </div>
      <div className='post'>
        <div className="image">
          <img src="https://www.w3.org/TR/css3-flexbox/images/flex-pack.svg" alt=""></img>
        </div>
        <div className="texts">
          <h2>Title</h2>
          <p className="info">
            <a className="author">Ajay</a>
            <time>2023-01-01 10:40</time>
          </p>
          <p className="summary">In this tutorial, I'm going to show you how to build a fullstack blog app </p>
        </div>  
      </div>
    </main>
  );
}

export default App;
