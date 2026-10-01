const filterButtons = Array.from(document.querySelectorAll('.tag-filter'));
const investmentTiles = Array.from(document.querySelectorAll('.investment-tile'));
const filterStatus = document.querySelector('#filter-status');

function applyInvestmentFilter(tag) {
  let visibleCount = 0;
  investmentTiles.forEach((tile) => {
    const tags = (tile.dataset.tags || '').split(/\s+/);
    const visible = tag === 'all' || tags.includes(tag);
    tile.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === tag;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const activeLabel = filterButtons.find((button) => button.dataset.filter === tag)?.textContent || 'All';
  filterStatus.textContent = tag === 'all'
    ? `Showing all ${visibleCount} investment options`
    : `Showing ${visibleCount} ${activeLabel.toLowerCase()} ${visibleCount === 1 ? 'option' : 'options'}`;
}

filterButtons.forEach((button) => button.addEventListener('click', () => applyInvestmentFilter(button.dataset.filter)));
applyInvestmentFilter('all');
