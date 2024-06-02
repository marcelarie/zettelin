type Props = {
  textToCopy: string;
  buttonText: string;
};

export default function CopyButton({ textToCopy, buttonText }: Props) {
  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };
  return (
    <button
      class="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600"
      type="button"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}
