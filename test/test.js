const axios = require('axios');

const baseURL = 'http://localhost:3000/tasks';

async function runTests() {
  try {
    // Test GET
    let res = await axios.get(baseURL);
    console.log('GET /tasks', res.status === 200 ? 'PASS' : 'FAIL');

    // Test POST
    res = await axios.post(baseURL, { title: "Test Task" });
    console.log('POST /tasks', res.status === 201 ? 'PASS' : 'FAIL');

    // Test PUT
    const taskId = res.data.id;
    res = await axios.put(`${baseURL}/${taskId}`, { completed: true });
    console.log('PUT /tasks/:id', res.data.completed === true ? 'PASS' : 'FAIL');

    // Test DELETE
    res = await axios.delete(`${baseURL}/${taskId}`);
    console.log('DELETE /tasks/:id', res.status === 204 ? 'PASS' : 'FAIL');
  } catch (err) {
    console.error(err.message);
  }
}

runTests();
