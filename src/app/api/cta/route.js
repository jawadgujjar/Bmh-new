// pages/api/ctas/index.js
import dbConnect from "@/lib/mongodb";
import CTA from '../../../models/cta';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const ctas = await CTA.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: ctas });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const cta = await CTA.create(req.body);
        res.status(201).json({ success: true, data: cta });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}