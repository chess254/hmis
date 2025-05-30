const getAllPatients = async (req, res) => {
  const pool = req.app.get('db');
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;
  try {
    const result = await pool.query(
      `SELECT * FROM Patient 
       WHERE first_name ILIKE $1 OR last_name ILIKE $1 
       ORDER BY patient_id 
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPatientById = async (req, res) => {
  const pool = req.app.get('db');
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Patient WHERE patient_id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Patient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPatient = async (req, res) => {
  const pool = req.app.get('db');
  const { national_id, first_name, last_name, dob, gender, address, phone } = req.body;
  if (!national_id || !first_name || !last_name || !dob || !gender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO Patient (national_id, first_name, last_name, dob, gender, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [national_id, first_name, last_name, dob, gender, address, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const updatePatient = async (req, res) => {
  const pool = req.app.get('db');
  const { id } = req.params;
  const { national_id, first_name, last_name, dob, gender, address, phone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Patient SET national_id = $1, first_name = $2, last_name = $3, dob = $4, gender = $5, address = $6, phone = $7 WHERE patient_id = $8 RETURNING *',
      [national_id, first_name, last_name, dob, gender, address, phone, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Patient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const deletePatient = async (req, res) => {
  const pool = req.app.get('db');
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Patient WHERE patient_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPatientVisits = async (req, res) => {
  const pool = req.app.get('db');
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Visit WHERE patient_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientVisits,
};