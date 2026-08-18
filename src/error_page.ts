abstract class BaseError {
  readonly status!: number;
  readonly message!: string;
  constructor(readonly content?: string) {}
  render() {
    return this.renderPage();
  }

  private renderPage() {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${this.status} ${this.message} - github-profile-trophy</title>
<meta name="color-scheme" content="dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2796%27%20height%3D%2796%27%20viewBox%3D%270%200%2032%2032%27%3E%20%3Ctitle%3Egithub-profile-trophy%3C%2Ftitle%3E%20%3Crect%20width%3D%2732%27%20height%3D%2732%27%20rx%3D%277%27%20fill%3D%27%23141118%27%20%2F%3E%20%3C%21--%20A%20cup%20earned%20by%20rank%2C%20which%20is%20what%20the%20service%20grades%3A%20the%20bowl%20is%20filled%20violet%20because%20a%20trophy%20is%20awarded%2C%20not%20attempted.%20Amber%20handles%20carry%20the%20accent%20rather%20than%20a%20star%20or%20a%20%271%27%2C%20both%20of%20which%20stop%20reading%20at%20favicon%20size.%20--%3E%20%3Cpath%20d%3D%27M11%207h10v5.5a5%205%200%200%201-10%200Z%27%20fill%3D%27%239b8cff%27%20%2F%3E%20%3Cpath%20d%3D%27M11%208.5H8.5v2a3%203%200%200%200%203%203M21%208.5h2.5v2a3%203%200%200%201-3%203%27%20fill%3D%27none%27%20stroke%3D%27%23f0a868%27%20stroke-width%3D%272%27%20stroke-linecap%3D%27round%27%20%2F%3E%20%3Cpath%20d%3D%27M16%2017.5v4%27%20stroke%3D%27%239b8cff%27%20stroke-width%3D%272.4%27%20stroke-linecap%3D%27round%27%20%2F%3E%20%3Crect%20x%3D%2710.5%27%20y%3D%2721.5%27%20width%3D%2711%27%20height%3D%273.2%27%20rx%3D%271.6%27%20fill%3D%27%23e9e6ef%27%20%2F%3E%20%3C%2Fsvg%3E">
<style>
*{box-sizing:border-box}
:root{--bg:#100f15;--surface:#191822;--line:#2b2836;--text:#e9e6ef;--dim:#9a93ad;--violet:#9b8cff;--amber:#f0a868;
--mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;--sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
html{color-scheme:dark}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.6 var(--sans);padding:clamp(2rem,7vw,4.5rem) 1.25rem 5rem}
main{max-width:44rem;margin:0 auto}
.mark{display:block;width:64px;height:64px;margin:0 0 1.5rem}
.status{font:700 .72rem/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--amber);margin:0 0 .7rem}
h1{font:700 clamp(1.3rem,4.5vw,1.8rem)/1.15 var(--mono);letter-spacing:-.02em;margin:0 0 .8rem}
.detail{color:var(--dim);margin:0 0 2rem;max-width:34rem}
.detail:empty{display:none}
a{color:var(--violet);text-underline-offset:3px}
a:focus-visible{outline:2px solid var(--violet);outline-offset:3px;border-radius:2px}
footer{border-top:1px solid var(--line);padding-top:1.25rem;color:var(--dim);font-size:13.5px;margin-top:2.5rem}
</style>
</head>
<body>
<main>
  <svg class="mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 32 32">
  <title>github-profile-trophy</title>
  <rect width="32" height="32" rx="7" fill="#141118" />
  <!-- A cup earned by rank, which is what the service grades: the bowl is filled violet
       because a trophy is awarded, not attempted. Amber handles carry the accent rather
       than a star or a "1", both of which stop reading at favicon size. -->
  <path d="M11 7h10v5.5a5 5 0 0 1-10 0Z" fill="#9b8cff" />
  <path d="M11 8.5H8.5v2a3 3 0 0 0 3 3M21 8.5h2.5v2a3 3 0 0 1-3 3" fill="none" stroke="#f0a868" stroke-width="2" stroke-linecap="round" />
  <path d="M16 17.5v4" stroke="#9b8cff" stroke-width="2.4" stroke-linecap="round" />
  <rect x="10.5" y="21.5" width="11" height="3.2" rx="1.6" fill="#e9e6ef" />
</svg>
  <p class="status">Error ${this.status}</p>
  <h1>${this.message}</h1>
  <p class="detail">${this.content ?? ""}</p>
  <p><a href="/">Back to github-profile-trophy</a></p>
  <footer>Self-hosted instance, restricted to whitelisted usernames.
  <a href="https://github.com/nixrajput/github-profile-trophy">Source on GitHub</a>.</footer>
</main>
</body>
</html>`;
  }
}

export class Error400 extends BaseError {
  readonly status = 400;
  readonly message = "Bad Request";
}

export class Error419 extends BaseError {
  readonly status = 419;
  readonly message = "Rate Limit Exceeded";
}

export class Error404 extends BaseError {
  readonly status = 404;
  readonly message = "Not Found";
}

export class Error502 extends BaseError {
  readonly status = 502;
  readonly message = "Bad Gateway";
}
