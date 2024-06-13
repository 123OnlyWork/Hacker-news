const express = require('express');
const axios = require('axios');
const path = require('path');
const NodeCache = require('node-cache'); 

const app = express();
const PORT = process.env.PORT || 5000;
const cache = new NodeCache();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршрут API запроса комментариев
app.get('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let comment = cache.get(id);
    if (!comment) {
      const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      comment = response.data;
      cache.set(id, comment, 60); 
    }
    res.json(comment);
  } catch (error) {
    console.error("Failed to fetch comment:", error);
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
});

// Маршрут API запроса новостей
app.get('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let news = cache.get(id);
    if (!news) {
      const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      news = response.data;
      cache.set(id, news, 60); 
    }
    res.json(news);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
