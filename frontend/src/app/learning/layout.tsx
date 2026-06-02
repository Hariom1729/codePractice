import { AchievementPopup } from '@/components/learning/AchievementPopup';

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AchievementPopup />
    </>
  );
}
