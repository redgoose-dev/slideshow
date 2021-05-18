![SLIDESHOW](https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/github/app-icon.png)

# Slideshow with electron

`electron`을 이용하여 pc용 앱으로 빌드합니다.


## Usage

일렉트론 앱으로 빌드하기전에 먼저 `main`브렌치에서 빌드된 파일들을 업데이트 합니다.

```shell
yarn install
yarn run docs
```

개발모드로 테스트를 하려면 다음과 같이 실행합니다.

```shell
yarn run dev
```

프로덕션으로 빌드하려면 다음과 같이 실행합니다.

```shell
yarn run build
```

빌드하면 macOS, Windows 버전의 실행파일이 `dist/`에 만들어져 있는것을 확인할 수 있습니다.
