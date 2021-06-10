const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('SSID', res.locals.user._id, {httpOnly: true});
  // console.log(res.cookie);
  next();
}

module.exports = cookieController;