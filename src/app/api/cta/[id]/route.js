// pages/api/ctas/[id].js
import dbConnect from "@/lib/mongodb";
import CTA from '../../../../models/cta';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const cta = await CTA.findById(id);
        if (!cta) {
          return res.status(404).json({ success: false, error: 'CTA not found' });
        }
        res.status(200).json({ success: true, data: cta });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const cta = await CTA.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!cta) {
          return res.status(404).json({ success: false, error: 'CTA not found' });
        }
        res.status(200).json({ success: true, data: cta });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCTA = await CTA.findByIdAndDelete(id);
        if (!deletedCTA) {
          return res.status(404).json({ success: false, error: 'CTA not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}