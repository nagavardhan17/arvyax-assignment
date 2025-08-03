const express = require('express');
const router = express.Router();
const {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveDraft,
  publishSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');
const auth = require('../middleware/authMiddleware');

// Public route
router.get('/sessions', getPublicSessions);

// Authenticated routes
router.get('/my-sessions', auth, getMySessions);
router.get('/my-sessions/:id', auth, getSingleSession);
router.post('/my-sessions/save-draft', auth, saveDraft);
router.post('/my-sessions/publish', auth, publishSession);
router.patch('/my-sessions/:id', auth, updateSession);
router.delete('/my-sessions/:id', auth, deleteSession); // ✅ Important route

module.exports = router;
