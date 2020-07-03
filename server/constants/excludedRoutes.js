const excludedRoutes = [
  '/favicon.ico',
  new RegExp('\/transactions/[0-9]{1,}\/payment'),
  new RegExp('\/transactions/[0-9]{1,}\/confirm'),
  new RegExp('\/transactions/[0-9]{1,}\/cancel'),
  new RegExp('\/process/[0-9]{1,}'),
];

module.exports = excludedRoutes;
