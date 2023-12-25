module.exports = {
  '*.ts': ['pnpm run lint'],
  '*': ['prettier --write --ignore-unknown . --cache'],
}
