function Header() {
    document.write(`
        <header>
            <div class="left">
                <h1>
                    <span id="bars-search">
                        <span id="bar"><i class="fa fa-bars"></i></span>
                        <span id="search-btn"><i class="fa fa-search"></i></span>
                        <a href="/login" id="btn-login"><i class="fa fa-user"></i></a>
                    </span>

                    <a href="/" id="wrap-title">
                        <img id="logo" src="assets/img/logo.png">
                        <strong id="title">Mystore</strong>
                    </a>
                </h1>
            </div>
            <div class="center">
                <form action="/search" method="GET" id="form-search">
                    <span id="search-hide"><i class="fa fa-arrow-left"></i></span>
                    <input type="search" name="" id="search" placeholder="Pesquisar" list="datalist-search" minlength="3" required>
                    <datalist id="datalist-search"></datalist>
                </form>
            </div>
            <div class="right">
                <a href="/login"><i class="fa fa-key"></i>Log In</a>
                <a href="/signup"><i class="fa fa-user-plus"></i>Sign Up</a>
            </div>
        </header>
    `);
}

function Category() {
    document.write(`
        <div class="category-lock"><span id="locker"><i class="fa fa-arrow-left"></i></span><span>Categorias</span></div>
        <ul id="list-category">
            <li class="promotion"><a href="/promotion"><span class="icon"><i class="fa fa-award"></i></span>Promoções</a></li>
            <li><a href="/category?id=0"><span class="icon"><i class="fa fa-desktop"></i></span>Computadores</a></li>
            <li><a href="/category?id=1"><span class="icon"><i class="fa fa-mobile"></i></span>Celulares</a></li>
            <li><a href="/category?id=2"><span class="icon"><i class="fa fa-gamepad"></i></span>Games</a></li>
            <li><a href="/category?id=3"><span class="icon"><i class="fa fa-camera"></i></span>Câmera</a></li>
            <li><a href="/category?id=4"><span class="icon"><i class="fa fa-shopping-bag"></i></span>Pastas</a></li>
            <li><a href="/category?id=5"><span class="icon"><i class="fa fa-car"></i></span>Carros</a></li>
            <li><a href="/category?id=6"><span class="icon"><i class="fa fa-book-open"></i></span>Livros</a></li>
            <li><a href="/category?id=7"><span class="icon"><i class="fas fa-hands-helping"></i></span>Serviços</a></li>
            <li><a href="/category?id=8"><span class="icon"><i class="fa fa-cog"></i></span>Acessórios</a></li>
            <li><a href="/category?id=9"><span class="icon"><i class="fa fa-align-justify"></i></span>Outros</a></li>
        </ul>
    `);
}

function Footer() {
    document.write(`
        <div class="footer">
        <div>
            <h2>Tecnologias</h2>
            <ul>
                <li>Nodejs</li>
                <li>NeDB</li>
            </ul>
        </div>

        <div>
            <h2>Patrocíneos</h2>
            <ul>
                <li><a href="https://whatsapp.com/chat?id=872081978"><i class="fa fa-plus"></i></a></li>
            </ul>
        </div>

        <div>
            <h2>Sobre Nós</h2>
            <ul>
                <li>Contacto</li>
                <li>Politica de privacidade</li>
            </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <span>mystore@sapo.co.mz</span>
        </div>
    `);
}