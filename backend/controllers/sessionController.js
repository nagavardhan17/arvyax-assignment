const Session = require('../models/Session');

// GET /sessions – public sessions
const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    console.error('❌ Error fetching public sessions:', err);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};

// GET /my-sessions – user's sessions
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (err) {
    console.error('❌ Error fetching user sessions:', err);
    res.status(500).json({ message: 'Error fetching user sessions' });
  }
};

// GET /my-sessions/:id – single session by ID
const getSingleSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    console.error('❌ Error fetching session:', err);
    res.status(500).json({ message: 'Error fetching session' });
  }
};

// POST /my-sessions/save-draft – save or update draft
const saveDraft = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    let session = await Session.findOne({
      user_id: req.user.id,
      status: 'draft',
      title,
    });

    if (session) {
      // Update existing draft
      session.tags = tags;
      session.json_file_url = json_file_url;
      await session.save();
    } else {
      // Create new draft
      session = new Session({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: 'draft',
      });
      await session.save();
    }

    res.json({ message: 'Draft saved', session });
  } catch (err) {
    console.error('❌ Failed to save draft:', err);
    res.status(500).json({ message: 'Failed to save draft' });
  }
};

// POST /my-sessions/publish – publish session
const publishSession = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    const session = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: 'published',
    });

    await session.save();
    res.json({ message: 'Session published', session });
  } catch (err) {
    console.error('❌ Failed to publish session:', err);
    res.status(500).json({ message: 'Failed to publish session' });
  }
};

// PATCH /my-sessions/:id – update published session
const updateSession = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { title, tags, json_file_url, updated_at: new Date() },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ message: 'Session updated', session });
  } catch (err) {
    console.error('❌ Failed to update session:', err);
    res.status(500).json({ message: 'Failed to update session' });
  }
};

// DELETE /my-sessions/:id – delete a session
const deleteSession = async (req, res) => {
  console.log('🧹 DELETE request received for ID:', req.params.id);
  console.log('🔐 From user:', req.user?.id);

  try {
    const deleted = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });

    if (!deleted) {
      console.warn('⚠️ Session not found or not owned by user');
      return res.status(404).json({ message: 'Session not found' });
    }

    console.log('✅ Session deleted:', deleted._id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    console.error('❌ Failed to delete session:', err);
    res.status(500).json({ message: 'Failed to delete session' });
  }
};

module.exports = {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveDraft,
  publishSession,
  updateSession,
  deleteSession
};
