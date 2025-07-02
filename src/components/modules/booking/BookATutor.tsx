import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IAvailability, ITutor } from '@/types/tutor.type';

const localizer = momentLocalizer(moment);

export default function BookSession() {
  const router = useRouter();
  const { id } = router.query;
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<IAvailability | null>(null);
  const [duration, setDuration] = useState(60);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    // Fetch tutor data
    const fetchTutor = async () => {
      const res = await fetch(`/api/tutors/${id}`);
      const data = await res.json();
      setTutor(data);
    };
    if (id) fetchTutor();
  }, [id]);

  const handleSlotSelect = (slot: IAvailability) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutorId: tutor?.id,
        slot: selectedSlot,
        duration,
        subject
      })
    });
    // Handle payment redirect or confirmation
  };

  if (!tutor) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tutor Profile Sidebar */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={tutor.profileImage || '/default-avatar.jpg'} 
                alt={tutor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{tutor.name}</h2>
                <p className="text-gray-600">{tutor.subjectList.join(', ')}</p>
                <p className="text-lg font-semibold">${tutor.hourlyRate}/hr</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select a subject</option>
                  {tutor.subjectList.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>

              {selectedSlot && (
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-bold">Selected Time</h3>
                  <p>
                    {selectedSlot.day}, {selectedSlot.startTime} - {selectedSlot.endTime}
                  </p>
                  <p className="font-bold mt-2">
                    Total: ${(tutor.hourlyRate * duration) / 60}
                  </p>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedSlot || !subject}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-300"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Select a Time</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <Calendar
              localizer={localizer}
              events={tutor.availability.map(slot => ({
                title: 'Available',
                start: new Date(`1970-01-01T${slot.startTime}`),
                end: new Date(`1970-01-01T${slot.endTime}`),
                resource: slot
              }))}
              defaultView="week"
              views={['week']}
              step={30}
              timeslots={2}
              min={new Date(1970, 0, 1, 8, 0, 0)} // 8 AM
              max={new Date(1970, 0, 1, 22, 0, 0)} // 10 PM
              onSelectEvent={(event) => handleSlotSelect(event.resource)}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: '#3b82f6',
                  borderColor: '#3b82f6',
                  cursor: 'pointer'
                }
              })}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">About {tutor.name}</h2>
            <p className="text-gray-700">{tutor.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}