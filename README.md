# dsubmit - Disabled Submit

This app disables the submit button and enables after all required fields have been filled.

### Demo

[See demo and instructions](https://ds.homerocavazos.com/)

### NPM

```
npm i @js-toolbox/js-disable-submit
```

### CDN

```
<script src="https://cdn.jsdelivr.net/gh/homerocavazos/dsubmit@main/dsubmit.min.js"
integrity="sha384-tTXJG0PySIO8OrbIwwM2qM9ExT+byjS3HnCif9KHb/QJjTkGFI6Cj1pwmfTuBVM5" crossorigin="anonymous"></script>
```

### Usage

Input elements must have a required attribute.

```
<input type="email" id="email" name="email" value="" required>
```

```
<script>
  const example = new dSubmit();
  example.init()
</script>
```
