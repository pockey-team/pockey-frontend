import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  genderOptions,
  occasionOptions,
  relationshipOptions,
} from "@/components/recommendation/setup/relation-form/constants";
import { DevTool } from "@/components/shared/react-hook-form-dev-tool";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RelationData, relationSchema } from "@/types/recommendation/setup";

interface Props {
  onSubmit: (data: RelationData) => Promise<void> | void;
}

export const RelationForm = ({ onSubmit }: Props) => {
  const form = useForm({
    resolver: zodResolver(relationSchema),
    defaultValues: { name: "" },
    reValidateMode: "onChange",
  });

  const [gender, relationship, occasion] = form.watch([
    "gender",
    "relationship",
    "occasion",
  ]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 px-4 py-4"
        >
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="mb-3 block text-center font-semibold text-gray-500 text-sm">
                  선물 받는 사람
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="이름을 지어주세요"
                    className="w-full rounded-lg border-transparent bg-gray-900 px-8 py-7 text-center text-base text-white placeholder:text-gray-600 md:text-base"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* gender */}
          <div className="mb-6">
            <Label className="mb-3 block font-semibold text-gray-500 text-sm">
              성별
            </Label>
            <div className="flex items-center justify-stretch gap-4">
              {genderOptions.map(({ label, value }) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto flex-grow border-gray-600 bg-transparent py-3 text-gray-600 hover:border-gray-300 hover:bg-gray-900 hover:text-gray-300",
                    gender === value &&
                      "border-green-300 text-green-300 hover:border-green-300 hover:bg-green-900/20 hover:text-green-300",
                  )}
                  onClick={() =>
                    form.setValue("gender", value, { shouldValidate: true })
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          {/* relationship */}
          <div className="mb-6">
            <Label className="mb-3 block font-semibold text-gray-500 text-sm">
              누구에게 줄까요?
            </Label>
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {relationshipOptions.map(({ label, value }) => (
                <Button
                  type="button"
                  variant="outline"
                  key={value}
                  className={cn(
                    "h-auto rounded-full border-gray-600 bg-transparent px-3 py-1.5 text-gray-600 text-sm hover:border-gray-300 hover:bg-gray-900 hover:text-gray-300",
                    relationship === value &&
                      "border-green-300 text-green-300 hover:border-green-300 hover:bg-green-900/20 hover:text-green-300",
                  )}
                  onClick={() =>
                    form.setValue("relationship", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          {/* occasion */}
          <div className="mb-6">
            <Label className="mb-3 block font-semibold text-gray-500 text-sm">
              언제 줄까요?
            </Label>
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {occasionOptions.map(({ label, value }) => (
                <Button
                  type="button"
                  variant="outline"
                  key={value}
                  className={cn(
                    "h-auto rounded-full border-gray-600 bg-transparent px-3 py-1.5 text-gray-600 text-sm hover:border-gray-300 hover:bg-gray-900 hover:text-gray-300",
                    occasion === value &&
                      "border-green-300 text-green-300 hover:border-green-300 hover:bg-green-900/20 hover:text-green-300",
                  )}
                  onClick={() =>
                    form.setValue("occasion", value, { shouldValidate: true })
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-md px-4 pb-10">
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="w-full rounded-lg bg-green-300 py-6 font-semibold text-black text-lg hover:bg-green-200 hover:text-black disabled:bg-gray-500"
            >
              다음
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
};
