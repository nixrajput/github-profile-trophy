<div align="center">

<img src="https://raw.githubusercontent.com/nixrajput/github-profile-trophy/master/assets/logo.svg" width="76" alt="github-profile-trophy">

# github-profile-trophy

<em>A trophy case of GitHub profile ranks, rendered as an SVG.</em>

<br />

[![Stars](https://img.shields.io/github/stars/nixrajput/github-profile-trophy?color=159F7C)][repo]
[![License: MIT](https://img.shields.io/github/license/nixrajput/github-profile-trophy?color=159F7C)][license]
[![Last commit](https://img.shields.io/github/last-commit/nixrajput/github-profile-trophy?label=last%20commit)][repo]
[![Issues](https://img.shields.io/github/issues/nixrajput/github-profile-trophy?label=issues)][issues]
[![PRs](https://img.shields.io/github/issues-pr/nixrajput/github-profile-trophy?label=PRs)][pulls]

<strong>Self-hosted &middot; Redis cache built in &middot; 24 themes &middot; CI rendering mode &middot; Deno on Vercel</strong><br>
<sub>The upstream public instance was disabled for cost reasons, so this runs on our own deployment and tokens. Responses are cached <strong>4 hours in Redis</strong> on top of an <strong>8 hour CDN edge cache</strong>, and <code>action.yml</code> can render the SVG inside a workflow instead - one API call per scheduled run, none at page-view time.</sub>

</div>

---

## Contents

- [github-profile-trophy](#github-profile-trophy)
  - [Contents](#contents)
  - [Quick start](#quick-start)
  - [Secret Rank](#secret-rank)
  - [Filter by titles](#filter-by-titles)
  - [Filter by ranks](#filter-by-ranks)
  - [Specify the maximum row & column size](#specify-the-maximum-row--column-size)
  - [Apply theme](#apply-theme)
  - [Margin Width](#margin-width)
  - [Margin Height](#margin-height)
  - [Example layout](#example-layout)
  - [Transparent background](#transparent-background)
  - [Hide frames](#hide-frames)
  - [Generate an svg file localy](#generate-an-svg-file-localy)
  - [Generate an svg inside Github CI (Workflow)](#generate-an-svg-inside-github-ci-workflow)
  - [🚀 Deployment](#-deployment)
  - [🛠 Local development](#-local-development)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)
  - [Support the project](#support-the-project)
  - [Connect](#connect)

Self-hosted service behind the trophy row on [nixrajput's profile README](https://github.com/nixrajput).
The upstream public instance was disabled for cost reasons, so this runs on our own Vercel
deployment and our own GitHub tokens.

**Endpoint:** `https://github-profile-trophy.nixrajput.com`

## Quick start

```md
[![trophy](https://github-profile-trophy.nixrajput.com/?username=nixrajput)](https://github.com/nixrajput/github-profile-trophy)
```

With the layout the profile README actually uses:

```md
[![trophy](https://github-profile-trophy.nixrajput.com/?username=nixrajput&column=5&row=2&theme=onedark&no-bg=true)](https://github.com/nixrajput)
```

**[Full theme list](#apply-theme)**

# About Rank

Ranks are `SSS` `SS` `S` `AAA` `AA` `A` `B` `C` `UNKNOWN` `SECRET`.

| Rank       | Description                                                                                |
| ---------- | ------------------------------------------------------------------------------------------ |
| SSS, SS, S | You are at a hard to reach rank. You can brag.                                             |
| AAA, AA, A | You will reach this rank if you do your best. Let's aim here first.                        |
| B, C       | You are currently making good progress. Let's aim a bit higher.                            |
| UNKNOWN    | You have not taken action yet. Let's act first.                                            |
| SECRET     | This rank is very rare. The trophy will not be displayed until certain conditions are met. |

**NOTE: The `UNKNOWN` rank is denoted by `?`**

## Secret Rank

The acquisition condition is secret, but you can see this.

<p align="center">
  <img width="110" src="https://github.com/user-attachments/assets/40461f38-a317-431c-93d2-a56c2e803cf3" />
</p>

There are only a few secret trophies. Therefore, if you come up with interesting
conditions, I will consider adding a trophy. I am waiting for contributions.

# About Display details

<p align="center">
  <img width="220" src="https://user-images.githubusercontent.com/6661165/91642962-6333e600-ea6a-11ea-83af-e371e996bfa6.png" />
</p>

1. Title name of aggregation target.
2. Current rank.
3. Title according to rank.
4. Target aggregation result.
5. Rank progress bar.

# Optional Request Parameters

- [title](#filter-by-titles)
- [rank](#filter-by-ranks)
- [column](#specify-the-maximum-row--column-size)
- [row](#specify-the-maximum-row--column-size)
- [theme](#apply-theme)
- [margin-w](#margin-width)
- [margin-h](#margin-height)
- [no-bg](#transparent-background)
- [no-frame](#hide-frames)

## Filter by titles

You can filter the display by specifying the titles of trophy.

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&title=Followers
```

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/6661165/92317141-80ebe700-f038-11ea-8501-4015bfbb2cf4.png">
</p>

If you want to specify multiple titles.

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&title=Stars,Followers
```

<p align="center">
  <img width="220" src="https://github.com/user-attachments/assets/3b8a1c8b-afcd-49dc-ab18-a439d5c36a83">
</p>

You can also exclude the trophies you don't want to display.

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&title=-Stars,-Followers
```

## Filter by ranks

You can filter the display by specifying the ranks.\
`Available values: SECRET SSS SS S AAA AA A B C`

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&rank=S
```

<p align="center">
  <img width="110" src="https://user-images.githubusercontent.com/6661165/91642657-1cdd8780-ea68-11ea-994b-4568a55cd22a.png" />
</p>

If you want to specify multiple ranks.

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&rank=S,AAA
```

<p align="center">
  <img width="220" src="https://github.com/user-attachments/assets/0c2ffca8-4b03-4d46-b1d7-4e1eb6702f68">
</p>

You can also exclude ranks.

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&rank=-C,-B
```

**NOTE: Since `UNKNOWN` is denoted by `?`, in order to include or exclude it you
will have to use `rank=?` and `rank=-?` respectively**

## Specify the maximum row & column size

You can specify the maximum row and column size.\
Trophy will be hidden if it exceeds the range of both row and column.

`Available value: number type`\
`Default: column=6 row=3`

Restrict only row

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&row=2
```

Restrict only column

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&column=2
```

Restrict row & column

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&row=2&column=3
```

<p align="center">
  <img width="330" src="https://user-images.githubusercontent.com/6661165/91659474-c07f7400-eb0a-11ea-84f2-eb6b42547829.png">
</p>

Adaptive column

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&column=-1
```

You can set `column` to `-1` to adapt the width to the number of trophies, the
parameter `row` will be ignored.

## Apply theme

Available themes.

| theme                       |
| --------------------------- |
| [flat](#flat)               |
| [onedark](#onedark)         |
| [gruvbox](#gruvbox)         |
| [dracula](#dracula)         |
| [monokai](#monokai)         |
| [chalk](#chalk)             |
| [nord](#nord)               |
| [alduin](#alduin)           |
| [darkhub](#darkhub)         |
| [juicyfresh](#juicyfresh)   |
| [buddhism](#buddhism)       |
| [oldie](#oldie)             |
| [radical](#radical)         |
| [onestar](#onestar)         |
| [discord](#discord)         |
| [algolia](#algolia)         |
| [gitdimmed](#gitdimmed)     |
| [tokyonight](#tokyonight)   |
| [matrix](#matrix)           |
| [apprentice](#apprentice)   |
| [dark_dimmed](#dark_dimmed) |
| [dark_lover](#dark_lover)   |
| [kimbie_dark](#kimbie_dark) |
| [aura](#aura)               |

### flat

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=flat
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/92325601-039b9300-f087-11ea-983a-fce8133549ee.png">
</p>

### onedark

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=onedark
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/92327052-d99b9e00-f091-11ea-9a24-c7ec86982370.png">
</p>

### gruvbox

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=gruvbox
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/92315152-e9c56600-f01c-11ea-9536-1bfbb158cfcb.png">
</p>

### dracula

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=dracula
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/92490273-c91f2b00-f22b-11ea-9481-b5daae4d7bc3.png">
</p>

### monokai

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=monokai
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/93725426-2c289e80-fbea-11ea-96a4-f6490ccf2126.png">
</p>

### chalk

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=chalk
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/94294003-1de7d300-ff9a-11ea-91d1-60417a4d919b.png">
</p>

### nord

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=nord
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/94346857-7ab2be80-006a-11eb-9082-36d377ae2531.png">
</p>

### alduin

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=alduin
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/99085932-2a88bf00-260c-11eb-9b26-d2f125773831.png">
</p>

### darkhub

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=darkhub
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/102801126-249ab080-43f8-11eb-91c8-f56f94c35777.png">
</p>

### juicyfresh

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=juicyfresh
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/104810094-edbc8c80-5835-11eb-8c20-a76192a00728.png">
</p>

### buddhism

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=buddhism
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/113709167-2412f500-971d-11eb-9ee5-0ab292cf8b4c.png">
</p>

### oldie

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=oldie
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/113709581-a0a5d380-971d-11eb-8583-770dc4091ebf.png">
</p>

### radical

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=radical
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/116633521-adbc8800-a994-11eb-97c4-e45a32721491.png">
</p>

### onestar

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=onestar
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/122048400-2af46d00-ce1c-11eb-94e0-c2c6ddaf6819.png">
</p>

### discord

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=discord
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/122048628-7dce2480-ce1c-11eb-9792-1e600b384c4d.png">
</p>

### algolia

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=algolia
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/131685203-92a31101-2d93-4d18-b24a-d81a8bb012c5.png">
</p>

### gitdimmed

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=gitdimmed
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/131685406-799a864f-2691-4840-bb71-1db9c087a507.png">
</p>

### tokyonight

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=tokyonight
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/6661165/135482087-27764d6f-53b4-4c2a-8473-32431d12660c.png">
</p>

### matrix

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=matrix
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/31789752/141647414-15cfe279-af12-4746-a886-f494c25c096d.png">
</p>

### apprentice

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=apprentice
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/31789752/144701036-285cdd4b-d687-4ddc-95c2-7ccae9e25a1f.png">
</p>

### dark_dimmed

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=dark_dimmed
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/31789752/147340893-655b9fa5-138f-4f29-91ec-2a17c93822d1.png">
</p>

### dark_lover

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=dark_lover
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/31789752/152659041-de5b23cb-1be8-4e6b-b07b-726127ab8c3a.png">
</p>

### kimbie_dark

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=kimbie_dark
```

<p align="center">
  <img width="660" src="https://user-images.githubusercontent.com/8161064/288417332-408705a4-ae9c-47fe-af1a-9fb08555f526.png">
</p>

### aura

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&theme=aura
```

<p align="center">
  <img width="660" src="https://github.com/user-attachments/assets/18a2266c-9a88-4882-940d-162c0c4d36e0">
</p>

## Margin Width

You can put a margin in the width between trophies.\
`Available value: number type`\
`Default: margin-w=0`

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&margin-w=15
```

<p align="center">
  <img width="735" src="https://user-images.githubusercontent.com/6661165/93668661-e0ca9f00-fac8-11ea-9bec-325454f49fb4.png">
</p>

## Margin Height

You can put a margin in the height between trophies.\
`Available value: number type`\
`Default: margin-h=0`

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&margin-h=15
```

<p align="center">
  <img width="110" height="330" src="https://github.com/user-attachments/assets/233dee5b-4491-46cc-884a-39d0aa928752">
</p>

## Example layout

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&column=3&margin-w=15&margin-h=15
```

<p align="center">
  <img width="360" src="https://user-images.githubusercontent.com/6661165/93668677-ff309a80-fac8-11ea-8ae3-3e3e8adbef39.png">
</p>

## Transparent background

You can turn the background transparent.\
`Available value: boolean type (true or false)`\
`Default: no-bg=false`

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&no-bg=true
```

<p align="center">
  <img width="969" src="https://github.com/user-attachments/assets/32d3b63b-7845-42cb-b71c-31abaa673bcb">
</p>

## Hide frames

You can hide the frames around the trophies.\
`Available value: boolean type (true or false)`\
`Default: no-frame=false`

```
https://github-profile-trophy.nixrajput.com/?username=nixrajput&no-frame=true
```

<p align="center">
  <img width="936" src="https://github.com/user-attachments/assets/54de15a3-d907-4a50-8117-170aae74d1cd">
</p>

## Generate an svg file localy

Using the render_svg.ts script you can generate your trophys as an svg file
given your username, (Enviroment Vars: See [env-example](env-example)).

Usage:

```bash
deno run --allow-net --allow-env --allow-read --allow-write ./render_svg.ts USERNAME OUTPUT_DIR THEME
```

## Generate an svg inside Github CI (Workflow)

Using the provided github action you can easly generate the trophy inside an
github workflow. This eliminates the needs of an online service running but you
have to manualy update rerun the action to update the file.

Usage:

```yaml
- name: Generate trophy
  uses: Erik-Donath/github-profile-trophy@feature/generate-svg
  with:
    username: your-username
    output_path: trophy.svg
    token: ${{ secrets.GITHUB_TOKEN }}
```

## 🚀 Deployment

Deployed to Vercel from this repo's `master` branch. The service is Deno, entry point `api/index.ts`.

| Environment variable                                              | Purpose                                                                    |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `GITHUB_TOKEN1`                                                   | GitHub token for the GraphQL queries. Scopes: `read:user` + `public_repo`. |
| `GITHUB_TOKEN2`                                                   | Second token used for rotation. The same token may be used for both.       |
| `WHITELIST`                                                       | Comma-separated usernames allowed to use this instance. Unset leaves it open. |
| `ENABLE_REDIS`                                                    | Set to `true` to turn on the Redis response cache.                         |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_USERNAME` / `REDIS_PASSWORD` | Redis connection, read only when `ENABLE_REDIS=true`.                      |

Caching is already built in and needs no code: responses are held for 4 hours in Redis
(`src/config/cache.ts`) on top of an 8 hour CDN edge cache. Turning Redis on is the cheapest
way to keep GitHub API usage down.

> [!TIP]
> `action.yml` renders the SVG inside a GitHub workflow and commits the file, which costs one
> API call per scheduled run and none at page-view time. See
> [Generate an svg inside Github CI](#generate-an-svg-inside-github-ci-workflow).

## 🛠 Local development

Requires [Deno](https://deno.land).

```bash
deno task start    # serve locally (main.ts)
deno task test     # run the test suite
deno task lint     # lint
deno task format   # format
```

## Contributing

Contributions are welcome. Fork, branch, and open a PR. Bugs and ideas go to [Issues][issues]; questions to [Discussions][discussions].

## Contributors

Thanks to everyone who has contributed to github-profile-trophy.

<a href="https://github.com/nixrajput/github-profile-trophy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nixrajput/github-profile-trophy" alt="Contributors" />
</a>

## License

Licensed under the **MIT** license - see [LICENSE](LICENSE).

Derived from [ryo-ma/github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) by ryo-ma, used under the MIT License. The original
copyright notice is retained in [LICENSE](LICENSE). This repository is an independent
deployment and is not affiliated with or endorsed by the original author.

## Support the project

<div align="center">

github-profile-trophy is MIT licensed and free to use, always. If it earns a place on your profile, sponsorship is welcome.

<br />

<a href="https://github.com/sponsors/nixrajput">
  <img src="https://img.shields.io/badge/Sponsor_on_GitHub-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" />
</a>
<a href="https://ko-fi.com/nixrajput">
  <img src="https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Ko-fi" />
</a>
<a href="https://www.buymeacoffee.com/nixrajput">
  <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee" />
</a>

</div>

## Connect

<div align="center">

**Nikhil Rajput**

<a href="https://github.com/nixrajput"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://linkedin.com/in/nixrajput"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://x.com/nixrajput"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
<a href="https://instagram.com/nixrajput"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://telegram.me/nixrajput"><img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
<a href="mailto:nkr.nikhil.nkr@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</div>

[repo]: https://github.com/nixrajput/github-profile-trophy
[issues]: https://github.com/nixrajput/github-profile-trophy/issues
[pulls]: https://github.com/nixrajput/github-profile-trophy/pulls
[discussions]: https://github.com/nixrajput/github-profile-trophy/discussions
[contributors]: https://github.com/nixrajput/github-profile-trophy/graphs/contributors
[license]: https://github.com/nixrajput/github-profile-trophy/blob/master/LICENSE
