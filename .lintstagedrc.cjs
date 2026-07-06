module.exports = {
  '*.{js,ts,json,md,yml,yaml}': ['oxfmt --write'],
  '*.{js,ts}': ['oxlint --fix'],
}
