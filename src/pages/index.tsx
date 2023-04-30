import { type NextPage } from "next";
import { useRouter } from "next/router";
import StartScreen from "~/components/StartScreen";

const Home: NextPage = () => {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to the first question of the poll
    router.push('/poll/1');
  };

  return <StartScreen onStart={handleStart} />;
};

export default Home;
