const userIdent = _.pick(body, ['anonymous_id', 'email']);
const tlAttribs = _.pick(body, ['first_name', 'last_name']);

if(Object.keys(tlAttribs).length > 0) {
  hull.user(userIdent).traits(tlAttribs);
}

hull.user(userIdent).track("Form submitted", _.omit(body, ['anonymous_id']));
