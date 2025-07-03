const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const { fn, col, literal } = require('sequelize');
const db = require('../models/index');


module.exports = {
  baseCreate: create,
  baseBulkCreate: bulkCreate,
  baseDetail: detail,
  baseList: list,
  baseList2: list2,
  baseUpdate: update,
  baseDelete: deleteEntry,
  baseRestore: baseRestore,
  baseCount: count,
  baseFindById: findById,
  baseGalleryList: GalleryList,
  baseFindByform_code: findByform_code,
  getWeatherDataFromDate: getWeatherDataFromDate,
  getWeatherDataFromDateV2: getWeatherDataFromDateV2,
  getSearchByLocation: getSearchByLocation,
  getallByLocation: getallByLocation,
  getAlartsByDate: getAlartsByDate,
  getDashboardAlarts: getDashboardAlarts,
  getDashboardWeatherDataRequests: getDashboardWeatherDataRequests,
  findToken_User: findToken_User,
  getDashboardAlartsType: getDashboardAlartsType,
  getDashboardUserRigionWise: getDashboardUserRigionWise,
};

function create(modal, data) {
  return modal.create(data);
}

function bulkCreate(modal, data) {
  return modal.bulkCreate(data, { returning: true });
}

function count(modal, searchParams) {
  return modal.count({ where: searchParams });
}


function findById(modal, params, key) {
  return modal.findOne({
    where: {
      [key]: params
    }
  });
}

function findBypatient_code(modal, params) {
  return modal.findOne({
    where: {
      patient_code: params
    }
  });
}

function findByform_code(modal, params) {
  return modal.findOne({
    where: {
      form_code: params
    }
  });
}

function findToken_User(modal) {
  return modal.findAll({
    attributes: ['divice_token'],
    where: {
      divice_token: {
        [Sequelize.Op.ne]: null,
      },
    },
  });
}




function detail(modal, params) {
  const query = {
    where: params.searchParams
  };
  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }

  return modal.findOne(query);
}


function GalleryList(modal, params) {
  const query = {
    where: params.searchParams
  };
  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  return modal.findAll(query);
}


async function list(modal, params) {
  let withPagination = false;


  const query = {
    where: params.searchParams || params.where || {},
  };

  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
    // distinct is true because paginator count include as row
    query['distinct'] = true;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('limit')) {
    query['limit'] = params.limit;
    withPagination = true;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('offset')) {
    query['offset'] = params.offset;
  }
  if (params.hasOwnProperty('isRaw')) {
    query['raw'] = params.isRaw;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  if (params.hasOwnProperty('having')) {
    query['having'] = params.having;
  }
  if (withPagination) {

    const data = await modal.findAndCountAll(query);
    const total = data.count;
    const totalPages = Math.ceil(total / params.limit);

    return {
      values: data,
      page: params.page,
      limit: params.limit,
      total_pages: totalPages,
      total: total
    }
  }
}



async function list2(modal, params, modal2) {
  let withPagination = false;


  const query = {
    where: params.searchParams || params.where || {},
    include: [
      {
        model: modal2,
        required: false // optional: include even if no match
      }
    ],
  };

  if (params.hasOwnProperty('attributes')) {
    query['attributes'] = params.attributes;
  }
  if (params.hasOwnProperty('include')) {
    query['include'] = params.include;
    // distinct is true because paginator count include as row
    query['distinct'] = true;
  }
  if (params.hasOwnProperty('order')) {
    query['order'] = params.order;
  }
  if (params.hasOwnProperty('limit')) {
    query['limit'] = params.limit;
    withPagination = true;
  }
  if (params.hasOwnProperty('paranoid')) {
    query['paranoid'] = params.paranoid;
  }
  if (params.hasOwnProperty('offset')) {
    query['offset'] = params.offset;
  }
  if (params.hasOwnProperty('isRaw')) {
    query['raw'] = params.isRaw;
  }
  if (params.hasOwnProperty('distinct')) {
    query['distinct'] = params.distinct;
  }
  if (params.hasOwnProperty('group')) {
    query['group'] = params.group;
  }
  if (params.hasOwnProperty('having')) {
    query['having'] = params.having;
  }
  if (withPagination) {

    const data = await modal.findAndCountAll(query);
    const total = data.count;
    const totalPages = Math.ceil(total / params.limit);

    return {
      values: data,
      page: params.page,
      limit: params.limit,
      total_pages: totalPages,
      total: total
    }
  }
}






function update(modal, params, data) {
  let queryParams = {};
  if (params.hasOwnProperty('searchParams')) {
    queryParams = { where: params.searchParams };
  } else {
    queryParams = { where: params };
  }
  if (params.hasOwnProperty('limit')) {
    queryParams['limit'] = params.limit;
  }
  if (params.hasOwnProperty('paranoid')) {
    queryParams['paranoid'] = params.paranoid;
  }
  console.log("params ==> ", queryParams);
  return modal.update(data, queryParams);
}



function deleteEntry(modal, searchParams) {
  return modal.destroy({ where: searchParams });
}

function baseRestore(modal, searchParams) {
  return modal.restore({ where: searchParams });
}


async function getWeatherDataFromDateV2(modal, locationId, startDate) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        location_id: locationId,
        date: {
          [Op.gte]: startDate
        }
      },
      // order: [['id', 'DESC']],
    });

    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}



async function getWeatherDataFromDate(modal, locationId, startDate) {
  const baseDate = new Date(startDate);

  // Calculate one day earlier using native JS
  const oneDayBefore = new Date(baseDate);
  oneDayBefore.setDate(baseDate.getDate() - 1);
  oneDayBefore.setHours(0, 0, 0, 0); // normalize to start of day

  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        location_id: locationId,
        [Op.or]: [
          { date: { [Op.gte]: baseDate } },       // from startDate onward
          { date: oneDayBefore }                  // exactly one day before
        ]
      }
    });

    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}



async function getSearchByLocation(modal, location_name, startDate) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        date: startDate,
        location_name: {
          [Op.like]: location_name + '%', // e.g., 'Ro%' or '%Ro%'
        }
      },
      // order: [['id', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}


async function getallByLocation(modal, location_name, startDate) {
  try {
    const results = await modal.findAll({
      where: {
        deletedAt: null,
        date: startDate,
      },
      // order: [['id', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}





async function getAlartsByDateOld(modal, todayDate, RiskandResponseModel, todayTime) {
  try {
    const results = await modal.findAll({
      where: {
        todate: {
          [Op.gte]: todayDate
        },
        to_time: {
          [Op.gte]: todayTime // Ensure from_time is not null
        },
      },
      include: [
        {
          model: RiskandResponseModel,
          required: false // optional: still return alerts even if no risk is found
        }
      ],
      order: [['todate', 'DESC']],
    });
    return results;
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }

}


async function getAlartsByDate(modal, todayDate, RiskandResponseModel, todayTime) {
  try {
    // const currentDateTime = new Date(`${todayDate}T${todayTime}`);
    // console.log("Current DateTime:", currentDateTime);
    const results = await modal.findAll({
        where: {
    [Op.and]: [
      Sequelize.where(
        Sequelize.fn('TIMESTAMP', Sequelize.col('todate'), Sequelize.col('to_time')),
        {
          [Op.gte]: `${todayDate} ${todayTime}:00`
        }
      ),
      { deletedAt: null }
    ]
  },
  include: [
    {
      model: RiskandResponseModel,
      required: false
    }
  ],
  order: [['todate', 'DESC']],
  logging: console.log
});
    return results;
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }

}


async function getDashboardAlarts(modal, year) {
  try {
    const currentYear = year;

    const alerts = await modal.findAll({
      attributes: [
        [Sequelize.fn('MONTH', col('todate')), 'month'],
        [Sequelize.fn('COUNT', '*'), 'count']
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', col('todate')), currentYear),
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    return alerts.map(alert => ({
      month: parseInt(alert.get('month'), 10),
      count: parseInt(alert.get('count'), 10)
    }));
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}


async function getDashboardWeatherDataRequests(modal, year) {
  try {
    const currentYear = year;

    const alerts = await modal.findAll({
      attributes: [
        [Sequelize.fn('MONTH', col('createdAt')), 'month'],
        [Sequelize.fn('COUNT', '*'), 'count']
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', col('createdAt')), currentYear),
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });

    return alerts.map(alert => ({
      month: parseInt(alert.get('month'), 10),
      count: parseInt(alert.get('count'), 10)
    }));
  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}

async function getDashboardAlartsType(modal, year) {
  try {
    const currentYear = year;

    const alertsByType = await modal.findAll({
      attributes: [
        'disasterType',
        [fn('COUNT', col('*')), 'alert_count']
      ],
      where: {
        fromdate: {
          [Op.gte]: new Date(`${currentYear}-01-01`),
          [Op.lte]: new Date(`${currentYear}-12-31`)
        }
      },
      group: ['disasterType'],
      order: [[fn('COUNT', col('*')), 'DESC']] // optional: order by count
    });

    return alertsByType

  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}


async function getDashboardUserRigionWise(modal, year) {
  try {
    const currentYear = year;

    const usersByRegion = await modal.findAll({
      attributes: [
        'region',
        [fn('COUNT', col('*')), 'user_count']
      ],
      where: {
        is_ragistered: true
      },
      group: ['region'],
      order: [[fn('COUNT', col('*')), 'DESC']] // optional: sort by count
    });

    return usersByRegion

  } catch (error) {
    console.error('Error fetching weather alarts data:', error);
    throw error;
  }
}