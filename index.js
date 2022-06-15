/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (excludeProperties = [], array = []) => {
  array.forEach(item => {
    excludeProperties.forEach(property => {
      delete item[property];
    });
    return item;
  });
  return array;
};

exports.excludeByProperty = (excludeProperties = "", array = []) => {
  let res = [];
  array.forEach(item => {
    if (!item.hasOwnProperty(excludeProperties)) {
      res.push(item);
    }
  });
  return res;
};

exports.sumDeep = (array = []) => {
  let res = [];
  array.forEach(item => {
    let sum = 0;
    item.objects.forEach(i => {
      sum += i.val;
    });
    res.push({ objects: sum });
  });
  return res;
};

exports.applyStatusColor = (colors = {}, statuses = []) => {
  const objectStatus = {};
  for (color in colors) {
    colors[color].forEach((status) => {
      objectStatus[status] = color;
    });
  }

  return statuses.reduce((accumulator, currentValue) => {
    for (pro in objectStatus) {
      if (pro == currentValue.status) {
        accumulator.push({
          ...currentValue,
          color: objectStatus[pro],
        });
      }
    }
    return accumulator;
  }, []);
};

exports.createGreeting = (greetFunc, greet = "") => {
  return (name = "") => {
    return greetFunc(greet, name);
  };
};

exports.setDefaults = (defaultProperties = {}) => {
  return (data = {}) => {
    return {
      ...defaultProperties,
      ...data,
    };
  };
};

exports.fetchUserByNameAndUsersCompany = async (
  name = "",
  { fetchStatus, fetchUsers, fetchCompanyById }
) => {
  const [status, users] = await Promise.all([fetchStatus(), fetchUsers()]);
  const selectedUser = users.find((user) => user.name === name);
  const company = await fetchCompanyById(selectedUser.companyId);
  return {
    company,
    status,
    user: selectedUser
  }
};
